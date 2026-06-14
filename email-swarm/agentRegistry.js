import { policyAgent } from "./agents/policyAgent.js";
import { reputationAgent } from "./agents/reputationAgent.js";
import { threatIntelAgent } from "./agents/threatIntelAgent.js";



export const agentRegistry = {
    reputationAgent,
    policyAgent,
    threatIntelAgent
};

