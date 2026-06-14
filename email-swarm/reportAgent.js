import { DEFAULT_MODEL } from "../constants.js";

export async function generateInvestigationReport(
    ai,
    messageDetails,
    findings
) {
    const prompt = `
        You are a senior email security analyst

        Investigate the email and create a report

        Message Details:

        ${JSON.stringify(messageDetails, null, 2)}

        Agent Findings:

        ${JSON.stringify(findings, null, 2)}

        Create:

        1. Executive Summary

        2. Evidence

        3. Root Cause

        4. Risk Assessment

        5. Recommended Action

    `;

    const response =
        await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt
        });

    return response.text;
}