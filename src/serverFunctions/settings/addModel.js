
import { installModel } from '../../llmCalls.js';

export default async function addModel(request) {
    return await installModel(request.modelName);
}
