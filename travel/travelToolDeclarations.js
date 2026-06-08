export const getWeatherDeclaration = {
    name: "getWeather",
    description: "Get weather information for a city",
    parameters: {
        type: "OBJECT",
        properties: { city: { type: "STRING" } },
        required: ["city"]
    }
};

export const getHotelPriceDeclaration = {
    name: "getHotelPrice",
    description: "Get average hotel price per night for a city",
    parameters: {
        type: "OBJECT",
        properties: { city: { type: "STRING" } },
        required: ["city"]
    }
};

export const getFlightPriceDeclaration = {
    name: "getFlightPrice",
    description: "Get round trip flight price for a city",
    parameters: {
        type: "OBJECT",
        properties: { city: { type: "STRING" } },
        required: ["city"]
    }
};

export const getCrowdLevelDeclaration = {
    name: "getCrowdLevel",
    description: "Get crowd level for a city",
    parameters: {
        type: "OBJECT",
        properties: { city: { type: "STRING" } },
        required: ["city"]
    }
};

export const getTravelTimeDeclaration = {
    name: "getTravelTime",
    description: "Get travel time for a city",
    parameters: {
        type: "OBJECT",
        properties: { city: { type: "STRING" } },
        required: ["city"]
    }
};

export const saveUserPreferenceDeclaration = {
    name: "saveUserPreference",
    description:
        "Save a user preference into structured memory. " +
        "category can be any name (likes, dislikes, enjoys, hates, budget, tripStyle, etc.). " +
        "Set valueType to 'list' to append to an array, or 'scalar' for a single value. " +
        "Use 'scalar' for budget (stored as a number) and tripStyle. " +
        "Save one item per call for list categories.",

    parameters: {
        type: "OBJECT",
        properties: {
            category: {
                type: "STRING",
                description: "The preference category, e.g. likes, dislikes, enjoys, hates, budget, tripStyle."
            },
            value: {
                type: "STRING",
                description: "The value to save. One item at a time for lists."
            },
            valueType: {
                type: "STRING",
                enum: ["list", "scalar"],
                description: "Use 'list' to append to an array, 'scalar' to set a single value."
            }
        },
        required: ["category", "value", "valueType"]
    }
};

export const clearMemoryDeclaration = {
    name: "clearMemory",
    description: "Clear all saved user preferences from memory. Use only when the user explicitly asks to reset or forget their preferences.",
    parameters: {
        type: "OBJECT",
        properties: {}
    }
};

export const getUserPreferenceDeclaration = {
    name: "getUserPreferences",
    description:
        "Retrieve all saved user preferences",

    parameters: {
        type: "OBJECT",
        properties: {}
    }
};
