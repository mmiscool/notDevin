import { fileIOread } from '../fileIO.js';

export default function function_read(inputObject) {
    //console.log("function_read", inputObject);
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    inputObject.functionPath = `./projects/${projectName}/functions/${functionName}`;

    // read file data
    inputObject.functionArgs = fileIOread(`${inputObject.functionPath}/${functionName}.args.md`);
    inputObject.jsdoc = fileIOread(`${inputObject.functionPath}/${functionName}.jsdoc`);
    inputObject.code = fileIOread(`${inputObject.functionPath}/${functionName}.js`);
    inputObject.spec = fileIOread(`${inputObject.functionPath}/${functionName}.spec.md`);
    inputObject.errorLog = fileIOread(`${inputObject.functionPath}/error.log`);

    console.log("function_read", inputObject);

    return inputObject;
}
