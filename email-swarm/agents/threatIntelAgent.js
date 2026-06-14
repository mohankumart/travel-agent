import { DEFAULT_MODEL } from "../../constants.js";

export async function threatIntelAgent(
    ai,
    context,
    tools
) {

    const intel =
        await tools.getThreatIntel({
            sender: context.message.sender
        });

    const prompt = `
You are a threat intelligence analyst.

Analyze this intelligence.

Sender:

${context.message.sender}

Threat Intelligence Data:

${JSON.stringify(
    intel,
    null,
    2
)}

Provide:

1. Threat Summary

2. Campaign Information

3. Known Risks

4. Recommended Actions
`;

    const response =
        await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt
        });

    return {
        agent: "threatIntel",
        rawData: intel,
        analysis: response.text
    };
}