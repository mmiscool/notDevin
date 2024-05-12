import { fileIOwrite } from '../../fileIO.js';
import  function_read from './read.js';
import  function_list  from './list.js';

export default async function compile_build(inputObject) {
    const projectName = inputObject.projectName;

    let codeFileText = '';


    // get the function list for the current project and itterate over it
    const functionList = await function_list(inputObject);
    for (const functionName of functionList.functions) {
        // get the function object
        const functionObject = await function_read({ functionName, projectName });

        console.log(functionObject);

        codeFileText += `// Function: ${functionName}\n`;
        codeFileText += `${functionObject.jsdoc}\n`;
        codeFileText += `${functionObject.code}\n\n\n\n\n\n`;
    }    



    // write the code file
    const codeFilePath = `./projects/${projectName}/code.js`;
    fileIOwrite(codeFilePath, codeFileText);
    return codeFileText;
}