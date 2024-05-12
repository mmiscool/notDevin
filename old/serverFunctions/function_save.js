import { storeObject } from '../fileIO.js';
import { testTheCode } from './function_generate.js';
import function_read from './function_read.js';

export default async function function_save(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;

    // make the folders if they don't exist

    console.log(`saving function ${functionName}...`);
    console.log("input object", inputObject);



    const functionPath = `./projects/${projectName}/functions/${functionName}/${functionName}`;


    await storeObject(functionPath, inputObject);



    console.log(`function ${functionName} has been saved. Testing...`);

    await testTheCode(inputObject);

    console.log(`function ${functionName} has been saved and tested.`);
    return await function_read(inputObject);

}




