import ollama from 'ollama';

const debugMode = false;

export default async function deleteModel(request) {
    if (debugMode) console.log(request);

    try {
        const response = await ollama.delete({ model: request.modelName });
        if (debugMode) console.log(response);
        return response;
    } catch (error) {
        console.error(`Model deletion failed!`);
        console.error(error);
        return error;
    }
}

