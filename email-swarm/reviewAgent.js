import { DEFAULT_MODEL } from "../constants.js";

export async function reviewAgent(
    ai,
    messageDetails,
    findings,
) {
    const prompt = `
        You are a senior incident commander.

        Message Details:
        ${JSON.stringify(messageDetails, null, 2)}

        Analyst Findings:
        ${JSON.stringify(findings, null, 2)}

        Review the findings. Identify:

        1. Agreements
        2. Disagreements
        3. Missing evidence
        4. Final risk rating

        Explain your reasoning.
    `;

    const response =
        await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt
        });

    return response.text;
}