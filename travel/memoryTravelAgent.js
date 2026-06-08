import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { runAgent } from "../agentLoop.js";
import { getUserPreferences, saveUserPreference } from "./memory/memoryTools.js";
import { getFlightPrice, getHotelPrice, getWeather } from "./travelTools.js";
import { saveUserPreferenceDeclaration, getUserPreferenceDeclaration, getWeatherDeclaration, getHotelPriceDeclaration, getFlightPriceDeclaration } from "./travelToolDeclarations.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


const tools = {
    saveUserPreference,
    getUserPreferences,

    getWeather,
    getHotelPrice,
    getFlightPrice
};

const toolDeclarations = [
    saveUserPreferenceDeclaration,
    getUserPreferenceDeclaration,

    getWeatherDeclaration,
    getHotelPriceDeclaration,
    getFlightPriceDeclaration
];

const systemInstruction = `
    You are a travel planning agent.

    IMPORTANT:

    User preferences are stored in structured memory like this:
    {
      preferences: { likes: [...], dislikes: [...], enjoys: [...], hates: [...] },
      budget: 20000,
      tripStyle: "relaxing"
    }

    Rules:
    - Things the user likes, dislikes, enjoys, hates → valueType "list" (nested under preferences).
    - budget and tripStyle → valueType "scalar" (top-level).
    - Save one item per call for lists.

    When the user mentions any preference, save it immediately.
    Before recommending, call getUserPreferences and use all fields.

    Before making recommendations, always call getUserPreferences first
    and use the saved data to filter and rank destinations.
`;

const messages = [
    {
        role: "user",
        parts: [
            {
                text: "My budget is 20000."
            }
        ]
    }
];

// const messages = [
//     {
//         role: "user",
//         parts: [
//             {
//                 text:
//                 "Suggest a weekend trip under ₹20,000."
//             }
//         ]
//     }
// ];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}


