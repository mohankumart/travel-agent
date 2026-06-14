import { DEFAULT_MODEL } from "./constants.js";

// Reusable agentic loop — call the model, execute tools, repeat until final answer
export async function runAgent({ ai, model = DEFAULT_MODEL, systemInstruction, tools, toolDeclarations, messages, maxIterations = 10, onToolCall, thinkingBudget = 1000 }) {
    const history = [...messages];
    let iteration = 1;

    while (iteration <= maxIterations) {
        console.log(`\n ================= LOOP ${iteration} =============== `);

        const response = await ai.models.generateContent({
            model,
            contents: history,
            config: {
                systemInstruction,
                thinkingConfig: {
                    includeThoughts: thinkingBudget > 0,
                    thinkingBudget,
                },
                tools: [{ functionDeclarations: toolDeclarations }]
            }
        });

        // Extract and log the model's internal reasoning (thought parts)
        const parts = response.candidates?.[0]?.content?.parts ?? [];

        const thinkingText = parts
            .filter(p => p.thought === true)
            .map(p => p.text)
            .join("\n");

        if (thinkingText) {
            console.log("\n Reasoning:");
            console.log(thinkingText);
        }

        // Add the model's turn to history before processing tool calls
        history.push({
            role: "model",
            parts: response.candidates[0].content.parts
        });

        const functionCalls = response.functionCalls ?? [];

        // No function calls means the model has enough info to give a final answer
        if (functionCalls.length === 0) {
            return response.text;
        }

        console.log("\n Model Response:");
        console.log(JSON.stringify(functionCalls, null, 2));

        console.log("\nExecuting Tools...");

        const toolResponses = [];

        // Execute each requested tool and collect the results
        for (const call of functionCalls) {
            const toolName = call.name;
            const handler = tools[toolName];

            if (!handler) {
                throw new Error(`Unknown tool: ${toolName}`);
            }

            console.log(`Calling ${toolName}`, JSON.stringify(call.args));

            const result = await handler(call.args);
            onToolCall?.({ name: toolName, args: call.args, result });

            toolResponses.push({ call, result });
        }

        // Return tool results to the model as a user turn
        history.push({
            role: "user",
            parts: toolResponses.map(({ call, result }) => ({
                functionResponse: {
                    name: call.name,
                    response: result
                }
            }))
        });

        //console.log("\nConversation History:");
        //console.log(JSON.stringify(messages, null, 2));

        iteration++;
    }

    console.log("\n========== MAX ITERATIONS REACHED ==========");
    return null;
}
