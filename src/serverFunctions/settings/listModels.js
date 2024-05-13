import ollama from 'ollama';

const debugMode = false;

export default async function listModels() {
    try {
        const ollamaModelsList = await ollama.list();
        if (debugMode) console.log(`Models available:`);
        if (debugMode) console.log(ollamaModelsList);
        return ollamaModelsList.models;
    } catch (error) {
        console.error(`Model listing failed!`);
        console.error(error);
        return error;
    }
}

