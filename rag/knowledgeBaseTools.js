import { documents } from "./knowledgeBase.js";

export async function listDocuments() {
    return {
        documents: documents.map(({ id, title }) => ({ id, title }))
    };
}

export async function searchKnowledgeBase({ query }) {
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);

    const scored = documents.map(doc => {
        const text = `${doc.title} ${doc.content}`.toLowerCase();
        const matchCount = keywords.filter(kw => text.includes(kw)).length;
        return { ...doc, score: matchCount };
    });

    const results = scored
        .filter(doc => doc.score > 0)
        .sort((a, b) => b.score - a.score);

    return { results };
}

export async function getDocumentById({ id }) {
    const document = documents.find(doc => doc.id == id);
    return { document: document ?? null };
}
