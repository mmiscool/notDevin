import { db } from "./schema.js";
import function_read from "./read.js";
import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

const debugMode = false;

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

    inputObject.errorLogs = await extractJSstructure(inputObject.code);


    // set needsGeneration to true if the errorLogs are not empty
    inputObject.needsGeneration = (inputObject.errorLogs == "" ? "false" : "true");

    //console.log("needsGeneration", needsGeneration, errorLogs);

    const missingFunctions = await findUndefinedFunctions(inputObject.code);
    console.log("misssing",missingFunctions);


    await db.db.writeDocument(inputObject);

    return await function_read(inputObject);

}




async function extractJSstructure(code) {

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
        const generatedCode = escodegen.generate(ast);

        return "";
    } catch (error) {
        console.error(error);
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
    const ast = await Promise.resolve(esprima.parseScript(code, { tolerant: true, range: true }));
    const functionCalls = await getFunctionCalls(ast);
    const functionDeclarations = await getFunctionDeclarations(ast);
    const predefinedFunctions = new Set(Object.getOwnPropertyNames(Math).concat(Object.getOwnPropertyNames(Array.prototype)).concat(Object.getOwnPropertyNames(String.prototype)).concat(Object.getOwnPropertyNames(Object.prototype)));

    const missingFunctions =await functionCalls
        .filter(call => !functionDeclarations.has(call.callee.name) && !predefinedFunctions.has(call.callee.name))
        .map(call => ({
            functionName: call.callee.name,
            functionArguments: call.arguments.map(arg => arg.name || JSON.stringify(arg.value)).join(', ')
        }));

    return missingFunctions;
}

