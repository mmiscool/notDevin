import { db } from "./schema.js";
import function_read from "./read.js";
import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import compile_build from './build.js';


const debugMode = true;

export default async function function_save(inputObject) {
    if (debugMode) console.log("function_save", inputObject);

    // remove these attributes from the object
    delete inputObject.action;
    delete inputObject.timeStamp;


    // check if te object contains all the required fields specified in the schema and if fields are missing add them with an empty string
    for (const key in db.schema) {
        if (!inputObject[key]) {
            console.log("missing key", key);
            inputObject[key] = "";
        }
    }

    inputObject.errorLogs = await extractJSstructure(inputObject);


    // set needsGeneration to true if the errorLogs are not empty
    inputObject.needsGeneration = (inputObject.errorLogs == "" ? "false" : "true");
    if (inputObject.errorLogs != "") inputObject.needsGeneration = "true";
    if (inputObject.code == "") inputObject.needsGeneration = "true";

    //console.log("needsGeneration", needsGeneration, errorLogs);

    const missingFunctions = await findUndefinedFunctions(inputObject.code);
    console.log("misssing", missingFunctions);


    await db.db.writeDocument(inputObject);

    compile_build(inputObject);

    return await function_read(inputObject);

}




async function extractJSstructure(inputObject) {
    let code = inputObject.code;
    if (debugMode === true) console.log("extractJSstructure", code);
    if (code == undefined) return "";
    if (code == "") return "";

    try {
        // Parsing the JavaScript code to an AST
        const ast = esprima.parseScript(code);
        // Function to handle each node
        const nodeHandler = (node) => {
            //console.log('Node Type:', node);
            // Perform any additional operations on each node here
        };

        // Traversing the AST
        estraverse.traverse(ast, {
            enter: (node) => {
                nodeHandler(node);
            }
        });

        // Rebuilding the JavaScript code from the AST
        const formattedCode = escodegen.generate(ast, {
            format: {
                indent: {
                    style: '    ', // 4 spaces for indentation
                },
                newline: '\n', // Use '\n' for newlines
                space: ' ', // Use a single space for separating elements
                json: false, // Do not generate JSON-style formatting
                renumber: false, // Do not renumber numeric literals
                hexadecimal: false, // Do not use hexadecimal numbers
                quotes: 'single', // Use single quotes for strings
                escapeless: false, // Do not escape characters unnecessarily
                compact: false, // Do not compact the code
                parentheses: true, // Keep parentheses around expressions
                semicolons: true // Use semicolons
            }
        });
        inputObject.code = formattedCode;
        console.log("formattedCode", code);

        return "";
    } catch (error) {
        console.log(error);
        return JSON.stringify(error);
    }
}
























function getFunctionCalls(ast) {
    return new Promise((resolve) => {
        const calls = [];
        estraverse.traverse(ast, {
            enter: (node) => {
                if (node.type === 'CallExpression') {
                    calls.push(node);
                }
            }
        });
        resolve(calls);
    });
}

function getFunctionDeclarations(ast) {
    return new Promise((resolve) => {
        const declarations = new Set();
        estraverse.traverse(ast, {
            enter: (node) => {
                if (node.type === 'FunctionDeclaration') {
                    declarations.add(node.id.name);
                }
            }
        });
        resolve(declarations);
    });
}

async function findUndefinedFunctions(code) {

    if (code == undefined) return [];
    if (code == "") return [];
    try {
        const ast = await Promise.resolve(esprima.parseScript(code, { tolerant: true, range: true }));
        const functionCalls = await getFunctionCalls(ast);
        const functionDeclarations = await getFunctionDeclarations(ast);
        const predefinedFunctions = new Set(Object.getOwnPropertyNames(Math).concat(Object.getOwnPropertyNames(Array.prototype)).concat(Object.getOwnPropertyNames(String.prototype)).concat(Object.getOwnPropertyNames(Object.prototype)));

        const missingFunctions = await functionCalls
            .filter(call => !functionDeclarations.has(call.callee.name) && !predefinedFunctions.has(call.callee.name))
            .map(call => ({
                functionName: call.callee.name,
                functionArguments: call.arguments.map(arg => arg.name || JSON.stringify(arg.value)).join(', ')
            }));


        console.log("missingFunctions", missingFunctions);
        return missingFunctions;
    } catch (error) {
        console.log("findUndefinedFunctions", error);
        return [];
    }


}

