
import { fileIOread } from "../../fileIO.js";
import { templateCallLLM } from '../../llmCalls.js';
import function_read from './read.js';
import function_save from "./save.js";



export default async function function_generate(inputObject) {
    let myFunction = await function_read(inputObject);
    const functionName = myFunction._id;



    console.log("here is the function object", myFunction);

    myFunction.errorLogs


    myFunction.arguments = await addTextChunkLabel("function input arguments", myFunction.arguments);
    myFunction.specification = await addTextChunkLabel("function specification", myFunction.specification);
    myFunction.code = await addTextChunkLabel("current function", myFunction.code);
    myFunction.errorLogs = await addTextChunkLabel("error log", myFunction.errorLogs);


    let code = await templateCallLLM("mf", myFunction);
    myFunction.code = await replaceFirstFunctionName(code, functionName);

    let jsdoc = await templateCallLLM("mf.jsdoc", myFunction);

    const errorLogs = await executeCodeAsync(code);

    return await function_save({
        _id: inputObject._id,
        jsdoc,
        code,
        errorLogs
    });
}

function addTextChunkLabel(label, textChunk) {
    console.log("addTextChunkLabel", label, textChunk);
    label = label.trim();
    textChunk = textChunk.trim();
    if (textChunk === "") return "";

    return textChunk = `## ${label}: \n` + textChunk;
}


export async function executeCodeAsync(codeString) {
    //console.log("Executing test code:", codeString)
    if (codeString == null) return true;
    if (codeString == "") return true;
    try {
        console.log("Execute code test result ");
        console.log(await eval(codeString + ";'';"));
        return true; // Return true if execution was successful
    } catch (error) {
        console.error("An error occurred while executing the code:", codeString, error);
        //return the error message as a JSON object
        return {
            errorString: `${error.message} ` + "\n" + `  ${error.stack}`,
            error: error
        };
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

