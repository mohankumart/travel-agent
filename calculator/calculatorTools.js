export async function add({ a, b}) {
    return {
        operation: "add",
        inputs: {
            a,
            b
        },
        result: a + b
    };
}

export async function subtract({ a, b}) {
    return {
        operation: "subtract",
        inputs: {
            a,
            b
        },
        result: a - b
    };
}

export async function multiply({ a, b }) {
    return {
        operation: "multiply",
        inputs: {
            a,
            b
        },
        result: a * b
    };
}

export async function divide({ a, b }) {
    return {
        operation: "divide",
        inputs: {
            a,
            b
        },
        result: a / b
    };
}

