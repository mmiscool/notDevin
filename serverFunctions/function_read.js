import { fileIOread } from '../fileIO.js';

export default function function_read(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;
    const functionArgs = fileIOread(`${functionPath}/${functionName}.args.md`);
    const jsdoc = fileIOread(`${functionPath}/${functionName}.jsdoc`);
    const code = fileIOread(`${functionPath}/${functionName}.js`);
    const spec = fileIOread(`${functionPath}/${functionName}.spec.md`);
    const errorLog = fileIOread(`${functionPath}/error.log`);

    return {
        functionArgs: functionArgs,
        spec: spec,
        jsdoc: jsdoc,
        code: code,
        errorLog: errorLog,
    };
}
