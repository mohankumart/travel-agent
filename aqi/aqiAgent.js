import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getAirQuality } from "./aqiTools.js";
import { runAgent } from "../agentLoop.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
    You are a Air quality agent.

    Use tools whenever information is missing.

    Gather enough information before finding Air Quality of the city.

    Consider:
    - airquality
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
        text: "How is Delhi's air quality today?"
      }
    ]
  }
];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}

