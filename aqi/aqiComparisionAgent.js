import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getAirQuality } from "./aqiTools.js";
import { runAgent } from "../agentLoop.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
    You are an AQI comparison agent.

    Use tools whenever information is missing.

    Compare all cities mentioned.

    Rank them from best to worst for outdoor exercise.

    Question:

    Which city is best for outdoor exercise:
    Delhi, Mumbai and Bangalore?
`;

const tools = {
    getAirQuality
};


const toolDeclarations = [
    {
        name: "getAirQuality",
        description: "Get air quality information for a city",
        parameters: {
            type: "OBJECT",
            properties: { city: { type: "STRING" } },
            required: ["city"]
        }
    },
];

const messages = [
  {
    role: "user",
    parts: [
      {
        text: "Which city is best for outdoor exercise: Delhi, Mumbai and Bangalore?"
      }
    ]
  }
];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}

