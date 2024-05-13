import { fileIOwrite } from '../../fileIO.js';
import  function_read from './read.js';
import  function_list  from './list.js';

export default async function compile_build(inputObject) {
    const projectName = inputObject.projectName;

    let codeFileText = '';


    // get the function list for the current project and itterate over it
    const functionList = await function_list(inputObject);

    console.log("Function list", functionList)
    for (const functionItem of functionList) {
        codeFileText += `// Function: ${functionItem._id}\n`;
        codeFileText += `${functionItem.jsdoc}\n`;
        codeFileText += `${functionItem.code}\n\n\n\n\n\n`;
    }    



    // write the code file
    const codeFilePath = `../projectData/${projectName}/code.js`;
    fileIOwrite(codeFilePath, codeFileText);
    console.log(`File written: ${codeFilePath}`);
    console.log(codeFileText);
    return codeFileText;
}