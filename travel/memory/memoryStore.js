import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMORY_FILE = path.join(__dirname, "memory.json");

function load() {
    if (!fs.existsSync(MEMORY_FILE)) return {};
    try {
        return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf-8"));
    } catch {
        return {};
    }
}

function persist(data) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
}

export function saveMemory(key, value) {
    const memory = load();
    memory[key] = value;
    persist(memory);
}

export function saveAllMemory(data) {
    persist(data);
}

export function clearAllMemory() {
    persist({});
}

export function getMemory(key) {
    return load()[key];
}

export function getAllMemory() {
    return load();
}
