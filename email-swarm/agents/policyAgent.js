import { DEFAULT_MODEL } from "../../constants.js";

export async function policyAgent(
    ai,
    context,
    tools
) {

    const policies =
        await tools.getPolicyMatches({
            messageId: context.investigation.id
        });

    const prompt = `
You are a senior email security policy analyst.

Your job is to analyze policy matches.

Message ID:

${context.investigation.id}

Policy Data:

${JSON.stringify(
    policies,
    null,
    2
)}

Provide:

1. Policy Summary

2. Severity Assessment

3. Why These Policies Triggered

4. Recommended Policy Actions
`;

    const response =
        await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt
        });

    return {
        agent: "policy",
        rawData: policies,
        analysis: response.text
    };
}
