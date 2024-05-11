import { fileIOdeleteFolder } from '../fileIO.js';

export default async function function_generate(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const folderName = `./projects/${projectName}/functions/${functionName}`;
    await fileIOdeleteFolder(folderName);
    return { functionName: functionName, message: 'Function deleted successfully' };
}