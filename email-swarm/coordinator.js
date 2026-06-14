import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { policyAgent } from "./agents/policyAgent.js";
import { reputationAgent } from "./agents/reputationAgent.js";
import { threatIntelAgent } from "./agents/threatIntelAgent.js";
import { getMessageDetails, getPolicyMatches, getSenderReputation, getThreatIntel } from "./tools/emailTools.js";
import { generateInvestigationReport } from "./reportAgent.js";
import { reviewAgent } from "./reviewAgent.js";
import { createSwarmPlan } from "./swarmPlanner.js";
import { agentRegistry } from "./agentRegistry.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const messageId = "SD-4321"

const tools = {
    getMessageDetails,
    getSenderReputation,
    getPolicyMatches,
    getThreatIntel
}

const details =
    await getMessageDetails({
        messageId
    });

const context = {
    investigation: {
        type: "blocked_email",
        id: messageId
    },

    message: {
        sender: details.sender,
        recipient: details.recipient,
        subject: details.subject
    }
}; 

const userRequest = `Investigate url for ${messageId}`;

const planningResponse = await createSwarmPlan(ai, userRequest);

const plan = JSON.parse(planningResponse);

console.log("Planning result here.............");

console.log(plan);

const tasks =
    plan.agents.map(
        (agentName) => {

            const agent =
                agentRegistry[agentName];
            console.log(`Executing ${agentName}`);
            return agent(
                ai,
                context,
                tools
            );
        }
    );

const results =
    await Promise.all(tasks);

console.log(results);    

const review = await reviewAgent(
    ai,
    details,
    results
)

console.log(
    "\n===== Review REPORT =====\n"
);

console.log(review);

const report = await generateInvestigationReport(
    ai,
    details,
    review
);

console.log(
    "\n===== INCIDENT REPORT =====\n"
);

console.log(report);


