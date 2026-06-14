import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { runAgent } from "../agentLoop.js";
import { createPlan } from "./planner.js";
import { getCrowdLevel, getFlightPrice, getHotelPrice, getTravelTime, getWeather } from "../travel/travelTools.js";
import { getCrowdLevelDeclaration, getFlightPriceDeclaration, getHotelPriceDeclaration, getTravelTimeDeclaration, getWeatherDeclaration } from "../travel/travelToolDeclarations.js";


dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const userQuestion = `I want a relaxing weekend trip under ₹20,000.`;

let plan;
try {
    plan = await createPlan(ai, userQuestion);
} catch (err) {
    console.error("Planning failed:", err.message);
    process.exit(1);
}

const tools = {
    getWeather,
    getHotelPrice,
    getFlightPrice,
    getCrowdLevel,
    getTravelTime
};

const toolDeclarations = [
    getWeatherDeclaration,
    getHotelPriceDeclaration,
    getFlightPriceDeclaration,
    getCrowdLevelDeclaration,
    getTravelTimeDeclaration
];

const systemInstruction = `
    You are a travel planning agent.

    Available destinations: Goa, Bangalore.

    You MUST call tools to get real data. Never answer from memory or assumptions.
    Do not ask the user for more information.

    For each destination in the plan, call:
    - getWeather
    - getFlightPrice
    - getHotelPrice
    - getCrowdLevel
    - getTravelTime

    Only recommend after you have called all tools for each destination.
`;

const messages = [
    {
        role: "user",
        parts: [
            {
                text: `
                USER REQUEST:

                ${userQuestion}

                EXECUTION PLAN:

                ${plan}

                Execute the plan above by calling the appropriate tools for each destination mentioned.
                Do NOT answer from memory. Call tools first, then synthesize a recommendation.
                `
            }
        ]
    }
];

console.log(plan);

let answer;
try {
    answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });
} catch (err) {
    console.error("Executor failed:", err.message);
    process.exit(1);
}

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}
