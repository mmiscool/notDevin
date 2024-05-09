import { fileIOwrite } from '../fileIO.js';
import { testTheCode } from './function_generate.js';
import  function_read from './function_read.js';

export default async function function_save(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;

    await fileIOwrite(`${functionPath}/${functionName}.args.md`, inputObject.functionArgs);
    console.log("Wrote the function args to the server");
    await fileIOwrite(`${functionPath}/${functionName}.js`, inputObject.code);
    console.log("Wrote the function code to the server");
    await fileIOwrite(`${functionPath}/${functionName}.spec.md`, inputObject.spec);
    console.log("Wrote the function spec to the server");
    console.log("function is now saved in the server");

    await testTheCode(inputObject);

    console.log("function is now tested in the server");
    return function_read(inputObject);
    
}