import { DEFAULT_MODEL } from "../../constants.js";

export async function reputationAgent(
    ai,
    context,
    tools
) {
    const reputation = await tools.getSenderReputation({
        sender: context.message.sender
    });

    const prompt = `
        You are a sender reputation analyst.

        Analyze this sender.

        Sender:

        ${context.message.sender}

        Reputation Data:

        ${JSON.stringify(
            reputation,
            null,
            2
        )}

        Provide:

        1. Reputation Summary

        2. Risk Level

        3. Investigation Notes
    `;

    const response = await ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: prompt
    });

    return {
        agent: "reputation",
        rawData: reputation,
        analysis: response.text
    };
}