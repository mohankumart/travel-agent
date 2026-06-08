import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { runAgent } from "../agentLoop.js";
import { add, divide, multiply, subtract } from "./calculatorTools.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const tools = {
    add,
    subtract,
    multiply,
    divide
};


const toolDeclarations = [
    {
        name: "add",
        description: "Add two numbers",
        parameters: {
            type: "OBJECT",
            properties: {
                a: {
                    type: "NUMBER"
                },
                b: {
                    type: "NUMBER"
                }
            },
            required: ["a", "b"]
        }
    },
    {
        name: "subtract",
        description: "Subtract two numbers",
        parameters: {
            type: "OBJECT",
            properties: {
                a: {
                    type: "NUMBER"
                },
                b: {
                    type: "NUMBER"
                }
            },
            required: ["a", "b"]
        }
    },
    {
        name: "multiply",
        description: "Multiply two numbers",
        parameters: {
            type: "OBJECT",
            properties: {
                a: {
                    type: "NUMBER"
                },
                b: {
                    type: "NUMBER"
                }
            },
            required: ["a", "b"]
        }
    },
    {
        name: "divide",
        description: "Divide two numbers",
        parameters: {
            type: "OBJECT",
            properties: {
                a: {
                    type: "NUMBER"
                },
                b: {
                    type: "NUMBER"
                }
            },
            required: ["a", "b"]
        }
    },
];

const systemInstruction = `
    You are a calculator agent.

    You MUST always use the provided tools to perform calculations.
    Never compute answers on your own, even for simple arithmetic.

    Break complex expressions into steps, using one tool at a time.
`;

const messages = [
    {
        role: "user",
        parts: [{
            text: `
                A company earned ₹50,000.

40% was spent on salaries.

The remaining amount was divided equally among 5 partners.

How much did each partner receive?
            `
        }]
    }
];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Answer:\n", answer);
}

