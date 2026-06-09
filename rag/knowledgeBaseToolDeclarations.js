export const listDocumentsDeclaration = {
    name: "listDocuments",
    description:
        "List all available documents in the knowledge base (id and title only). " +
        "Call this first when you don't know which document to retrieve.",
    parameters: {
        type: "OBJECT",
        properties: {}
    }
};

export const searchKnowledgeBaseDeclaration = {
    name: "searchKnowledgeBase",
    description:
        "Search documents by keywords. Returns ranked results with relevance scores. " +
        "Use this when you have a topic or question but not a specific document id.",
    parameters: {
        type: "OBJECT",
        properties: {
            query: {
                type: "STRING",
                description: "Keywords or question to search for."
            }
        },
        required: ["query"]
    }
};

export const getDocumentByIdDeclaration = {
    name: "getDocumentById",
    description:
        "Fetch the full content of a document by its id. " +
        "Use this when you already know the document id from listDocuments or searchKnowledgeBase.",
    parameters: {
        type: "OBJECT",
        properties: {
            id: {
                type: "STRING",
                description: "The document id e.g. 'doc1'."
            }
        },
        required: ["id"]
    }
};
