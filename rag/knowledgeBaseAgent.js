import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { runAgent } from "../agentLoop.js";
import { listDocuments, getDocumentById, searchKnowledgeBase } from "./knowledgeBaseTools.js";
import { listDocumentsDeclaration, getDocumentByIdDeclaration, searchKnowledgeBaseDeclaration } from "./knowledgeBaseToolDeclarations.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const tools = {
    listDocuments,
    searchKnowledgeBase,
    getDocumentById
};

const toolDeclarations = [
    listDocumentsDeclaration,
    searchKnowledgeBaseDeclaration,
    getDocumentByIdDeclaration
];

const systemInstruction = `
    You are a security knowledge agent.

    Never answer from memory.

    Always search the knowledge base first.

    Answer only using retrieved documents.
`;

const messages = [
    {
        role: "user",
        parts: [{
            text: `what is defined in with document id doc2?`
        }]
    }
];

const answer = await runAgent({ ai, systemInstruction, tools, toolDeclarations, messages });

if (answer) {
    console.log("\nFinal Recommendation:\n", answer);
}
