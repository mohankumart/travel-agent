import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { runAgent } from "../agentLoop.js";
import { getDeliveryStatus, getMessageDetails, getPolicyMatches, getSenderReputation, getThreatIntel } from "./emailTools.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const tools = {
    getMessageDetails,
    getSenderReputation,
    getPolicyMatches,
    getDeliveryStatus,
    getThreatIntel
};

const toolDeclarations = [
    {
        name: "getMessageDetails",
        description: "Fetch Message Details for the messageId",
        parameters: {
            type: "OBJECT",
            properties: { messageId: { type: "STRING" } },
            required: ["messageId"]
        }
    },
    {
        name: "getSenderReputation",
        description: "Fetch Sender Reputation for a sender",
        parameters: {
            type: "OBJECT",
            properties: { sender: { type: "STRING" } },
            required: ["sender"]
        }
    },
    {
        name: "getPolicyMatches",
        description: "Fetch policy matches for a messageId",
        parameters: {
            type: "OBJECT",
            properties: { messageId: { type: "STRING" } },
            required: ["messageId"]
        }
    },
    {
        name: "getDeliveryStatus",
        description: "Fetch Delivery status of the email with messageId",
        parameters: {
            type: "OBJECT",
            properties: { messageId: { type: "STRING" } },
            required: ["messageId"]
        }
    },
    {
        name: "getThreatIntel",
        description: "Fetch Threat Intelligence for a sender",
        parameters: {
            type: "OBJECT",
            properties: { sender: { type: "STRING" } },
            required: ["sender"]
        }
    },
];

const systemInstruction = `
You are an email security investigation agent.

Gather evidence before making conclusions.

Use tools whenever information is missing.

Explain the reason for blocking an email using evidence collected from tools.
`;

const messages = [
    {
        role: "user",
        parts: [{
            text: `
            Compare MSG-22222 and MSG-33333.

Why were they blocked?
            `
        }]
    }
];
            
const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}






