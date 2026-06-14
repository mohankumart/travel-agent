import { DEFAULT_MODEL } from "../constants.js";

export async function createSwarmPlan(
    ai,
    userRequest
){
    const availableAgents = [
        {
            name: "reputationAgent",
            description:
            "Investigates sender reputation and trustworthiness"
        },
        {
            name: "policyAgent",
            description:
            "Investigates policy matches and enforcement decisions"
        },
        {
            name: "threatIntelAgent",
            description:
            "Investigates campaigns, malware families and threat intelligence"
        }
    ];

    const prompt = `
        You are a swarm planning agent

        Available agents: ${JSON.stringify(availableAgents, null, 2)}

        Based on the user request,
        select the agents needed.            

        Return ONLY JSON.

        Example:

        {
            "agents": [
                "reputationAgent",
                "policyAgent"
            ]
        }

        User Request:

        ${userRequest}

    `;

    const response =
        await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

    return response.text;
}