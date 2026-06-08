import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { getCrowdLevel, getFlightPrice, getHotelPrice, getTravelTime, getWeather } from "./travelTools.js";
import { runAgent } from "../agentLoop.js";
import {
    getCrowdLevelDeclaration,
    getFlightPriceDeclaration,
    getHotelPriceDeclaration,
    getTravelTimeDeclaration,
    getWeatherDeclaration
} from "./travelToolDeclarations.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    Use tools whenever information is missing.

    Gather enough information before recommending a destination.

    Consider:
    - weather
    - flight cost
    - hotel cost
    - Crowd level
    - Travel time
    - budget
`;

const messages = [
    {
        role: "user",
        parts: [{
            text: `
                I want a relaxing weekend trip.

I dislike crowds.

Budget ₹15,000.

Choose between Goa and Bangalore.
            `
        }]
    }
];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}
