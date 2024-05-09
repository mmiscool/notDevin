import { fileIOread, fileIOwrite, fileIOdelete, makeFolder } from "../fileIO.js";
import { templateCallLLM } from '../llmCalls.js';
import { executeCodeAsync } from '../testCode.js';



export default async function function_generate(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;
    const functionArgs = fileIOread(`${functionPath}/${functionName}.args.md`);
    const code = await fileIOread(`${functionPath}/${functionName}.js`);
    const spec = await fileIOread(`${functionPath}/${functionName}.spec.md`);
    const errorLog = await fileIOread(`${functionPath}/error.log`);


    console.log("functionGenerator", inputObject);

    await makeFolder(functionPath);


    let specFilePath = `${functionPath}/${functionName}.spec.md`;

    let currentSpecFileContents = await fileIOread(specFilePath);

    if (currentSpecFileContents == "") {
        const specTemplate = await fileIOread(`./promptTemplates/mf.spec.md`);
        await fileIOwrite(specFilePath, specTemplate);
    }

    let currentCodeContents = await fileIOread(`${functionPath}/${functionName}.js`);

    ///await launchEditor(specFilePath);
    currentSpecFileContents = await fileIOread(specFilePath);

    if (currentCodeContents == "") {
        currentCodeContents = `## Current code
  ${currentCodeContents}`;
    }


    let promptResult = await templateCallLLM("mf", {
        name: functionName,
        spec: currentSpecFileContents,
        currentCodeContents: currentCodeContents,
        functionArgs: functionArgs
    });


    promptResult = await replaceFirstFunctionName(promptResult, functionName);
    // promptResult = "this should make throw ERROR !!|";
    await fileIOwrite(`${functionPath}/${functionName}.js`, promptResult);

    await testTheCode(inputObject);
}

import path from 'path';
export async function testTheCode(inputObject) {
    console.log(inputObject)
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;


    const codeToTest = await fileIOread(`${functionPath}/${functionName}.js`);
    console.log("codeToTest", codeToTest);

    //console.log(`${functionPath}/${functionName}.js`);

    await fileIOdelete(`${functionPath}/error.log`, true);
    console.log(codeToTest);
    const testResult = await executeCodeAsync(codeToTest);


    if (testResult !== true) {
        console.log("Error executing code: ", testResult);
        // write the error to an error.log file
        await fileIOwrite(`${functionPath}/error.log`, JSON.stringify(testResult));
        console.log(`we wrote the results of thest to ${functionPath}/error.log`)
        return false;
    } else {
        console.log("Test result: ", testResult);
        return true;
    }

}




function cleanupMarkdownCodeBlock(codeBlock) {
    //remove the string "```javascript" from the beginning of the code block
    //remove the string "```" from the end of the code block
    return codeBlock.replace("```javascript", "").replace("```", "");

}




function cleanupLeadingAndTrailingSpaces(codeBlock) {
    // get rid of leading and trailing spaces and leading and trailing newlines
    let trimedResult = codeBlock.trim();
    // get rid of leading and trailing newlines
    trimedResult = trimedResult.replace(/^\n+|\n+$/g, '');
    return trimedResult;
}




export function replaceFirstFunctionName(codeSnippet, newName) {
    codeSnippet = cleanupMarkdownCodeBlock(codeSnippet);
    codeSnippet = cleanupLeadingAndTrailingSpaces(codeSnippet);



    // Regular expression to match function names in different declaration styles
    const functionRegex = /function\s+([\w$]+)\s*\(|([\w$]+)\s*=\s*function\s*\(/;

    // Replace the first occurrence of a function name
    return codeSnippet.replace(functionRegex, (match, p1, p2) => {
        // Check which group matched to ensure we replace correctly
        if (p1) {
            // Traditional function declaration
            return `function ${newName}(`;
        } else {
            // Function expression
            return `${newName} = function (`;
        }
    });
}

