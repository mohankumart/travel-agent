import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { runAgent } from "../agentLoop.js";
import { getUserPreferences, saveUserPreference, clearMemory } from "./memory/memoryTools.js";
import { getFlightPrice, getHotelPrice, getWeather } from "./travelTools.js";
import {
    saveUserPreferenceDeclaration,
    getUserPreferenceDeclaration,
    getWeatherDeclaration,
    getHotelPriceDeclaration,
    getFlightPriceDeclaration
} from "./travelToolDeclarations.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const tools = { saveUserPreference, getUserPreferences, clearMemory, getWeather, getHotelPrice, getFlightPrice };
const toolDeclarations = [
    saveUserPreferenceDeclaration,
    getUserPreferenceDeclaration,
    getWeatherDeclaration,
    getHotelPriceDeclaration,
    getFlightPriceDeclaration
];

const systemInstruction = `
    You are a travel planning agent.

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
`;

// Each test case: input text + expected tool calls that must appear
const testCases = [
    // {
    //     name: "saves a like as a list item",
    //     input: "I love beaches",
    //     expect: [
    //         { name: "saveUserPreference", args: { category: "likes", value: "beaches", valueType: "list" } }
    //     ]
    // },
    // {
    //     name: "splits multiple likes into separate calls",
    //     input: "I love beaches and street food",
    //     expect: [
    //         { name: "saveUserPreference", args: { category: "likes", valueType: "list" } },
    //         { name: "saveUserPreference", args: { category: "likes", valueType: "list" } }
    //     ]
    // },
    // {
    //     name: "saves a dislike as a list item",
    //     input: "I hate crowded places",
    //     expect: [
    //         { name: "saveUserPreference", args: { valueType: "list" } }
    //     ]
    // },
    {
        name: "saves budget as scalar",
        input: "My budget is 20000",
        expect: [
            { name: "saveUserPreference", args: { category: "budget", valueType: "scalar" } }
        ]
    },
    // {
    //     name: "calls getUserPreferences before recommending",
    //     input: "Suggest a weekend trip",
    //     expect: [
    //         { name: "getUserPreferences" }
    //     ]
    // }
];

// Check if an actual tool call satisfies an expected one.
// Only checks the fields present in expected.args — extra args are fine.
function matches(actual, expected) {
    if (actual.name !== expected.name) return false;
    if (!expected.args) return true;
    for (const [key, val] of Object.entries(expected.args)) {
        if (String(actual.args?.[key]) !== String(val)) return false;
    }
    return true;
}

async function runEval(testCase) {
    await clearMemory(); // isolate each test from previous state
    const capturedCalls = [];

    await runAgent({
        ai,
        systemInstruction,
        tools,
        toolDeclarations,
        messages: [{ role: "user", parts: [{ text: testCase.input }] }],
        onToolCall: (call) => capturedCalls.push(call)
    });

    // Each expected call must be matched by at least one actual call
    const results = testCase.expect.map(expected => ({
        expected,
        matched: capturedCalls.some(actual => matches(actual, expected))
    }));

    return {
        passed: results.every(r => r.matched),
        results,
        capturedCalls
    };
}

// ── Runner ────────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
    process.stdout.write(`\n[${testCase.name}] ... `);

    const { passed: ok, results, capturedCalls } = await runEval(testCase);

    if (ok) {
        console.log("PASSED");
        passed++;
    } else {
        console.log("FAILED");
        failed++;
        for (const r of results) {
            if (!r.matched) {
                console.log(`  missing : ${JSON.stringify(r.expected)}`);
            }
        }
        console.log(`  actual  : ${capturedCalls.map(c => `${c.name}(${JSON.stringify(c.args)})`).join(", ") || "(none)"}`);
    }
}

console.log(`\n${passed}/${passed + failed} passed`);
