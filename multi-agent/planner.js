import { DEFAULT_MODEL } from "../constants.js";

export async function createPlan(ai, userQuestion) {
    try {
        const response = await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: `
                You are a planning agent for a travel assistant.

                Available destinations: Goa, Bangalore.

                User Request: ${userQuestion}

                Create a plan with numbered steps that names specific destinations from the list above.
                Each step must reference a specific city.
                Return numbered steps only.
            `
        });

        return response.text;
    } catch (err) {
        throw new Error(`Planner failed: ${err.message}`);
    }
}

