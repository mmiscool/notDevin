import { fileIOwrite } from '../fileIO.js';
import { testTheCode } from './function_generate.js';
import  function_read from './function_read.js';

export default async function function_save(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;

    // make the folders if they don't exist
    const functionPath = `./projects/${projectName}/functions/${functionName}`;
    await fileIOwrite(`${functionPath}/${functionName}.args.md`, inputObject.functionArgs);
    await fileIOwrite(`${functionPath}/${functionName}.jsdoc`, inputObject.jsdoc);
    await fileIOwrite(`${functionPath}/${functionName}.js`, inputObject.code);
    await fileIOwrite(`${functionPath}/${functionName}.spec.md`, inputObject.spec);

    console.log(`function ${functionName} has been saved. Testing...`);

    await testTheCode(inputObject);

    console.log(`function ${functionName} has been saved and tested.`);
    return await function_read(inputObject);
    
}