import { getAllMemory, saveAllMemory, clearAllMemory } from "./memoryStore.js";

const VALID_VALUE_TYPES = ["list", "scalar"];

export async function saveUserPreference({ category, value, valueType }) {
    if (!category || typeof category !== "string") {
        return { success: false, error: "category is required and must be a string." };
    }
    if (!value || typeof value !== "string") {
        return { success: false, error: "value is required and must be a string." };
    }
    if (!VALID_VALUE_TYPES.includes(valueType)) {
        return { success: false, error: `valueType must be one of: ${VALID_VALUE_TYPES.join(", ")}` };
    }
    if (valueType === "list" && value.includes(",")) {
        return { success: false, error: "Save one item per call. Split into multiple saveUserPreference calls." };
    }

    const memory = getAllMemory();

    if (valueType === "list") {
        if (!memory.preferences) memory.preferences = {};
        if (!Array.isArray(memory.preferences[category])) memory.preferences[category] = [];
        if (!memory.preferences[category].includes(value)) {
            memory.preferences[category].push(value);
        }
    } else if (category === "budget") {
        const budget = Number(value);
        if (isNaN(budget)) {
            return { success: false, error: "budget value must be a numeric string e.g. '20000'." };
        }
        memory[category] = budget;
    } else {
        memory[category] = value;
    }

    saveAllMemory(memory);
    return { success: true, memory };
}

export async function getUserPreferences() {
    return getAllMemory();
}

export async function clearMemory() {
    clearAllMemory();
    return { success: true };
}
