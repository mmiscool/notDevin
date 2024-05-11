import { fileIOread, fileIOwrite, fileIOdelete, makeFolder } from "../fileIO.js";
import { templateCallLLM } from '../llmCalls.js';
import { executeCodeAsync } from '../testCode.js';
import function_read from './function_read.js';



export default async function function_generate(inputObject) {
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;

    let myFunction = function_read(inputObject);
    myFunction.name = functionName;
    myFunction.functionArgs= await addTextChunkLabel("function input arguments", myFunction.functionArgs);
    myFunction.spec = await addTextChunkLabel("function specification", myFunction.spec);
    myFunction.code = await addTextChunkLabel("current function", myFunction.code);
    myFunction.errorLog = await addTextChunkLabel("error log", myFunction.errorLog);


    let currentCodeContents = await templateCallLLM("mf", myFunction);

    currentCodeContents = await replaceFirstFunctionName(currentCodeContents, functionName);

    await fileIOwrite(`${functionPath}/${functionName}.js`, currentCodeContents);

    let JSdocString = await templateCallLLM("mf.jsdoc", myFunction);

    await fileIOwrite(`${functionPath}/${functionName}.jsdoc`, JSdocString);


    await testTheCode(inputObject);
}

function addTextChunkLabel(label, textChunk) {
    label = label.trim();
    textChunk = textChunk.trim();
    if (textChunk === "") return "";

    return textChunk = `## ${label}: \n` + textChunk;
}




export async function testTheCode(inputObject) {
    //console.log(inputObject)
    const functionName = inputObject.functionName;
    const projectName = inputObject.projectName;
    const functionPath = `./projects/${projectName}/functions/${functionName}`;


    const codeToTest = await fileIOread(`${functionPath}/${functionName}.js`);
    //console.log("codeToTest", codeToTest);

    //console.log(`${functionPath}/${functionName}.js`);

    await fileIOdelete(`${functionPath}/error.log`, true);
    //console.log(codeToTest);
    const testResult = await executeCodeAsync(codeToTest);

    // consolelog what type the test result is
    console.log("Test result type: ", typeof testResult);


    if (testResult !== true) {
        console.log("Error executing code: ", testResult.errorString);
        // write the error to an error.log file
        await fileIOwrite(`${functionPath}/error.log`, testResult.errorString);
        console.log(`we wrote the results of test to ${functionPath}/error.log`)
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

