import { db } from "./schema.js";
import function_read from "./read.js";
import * as esprima from 'esprima';
import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';



export default async function function_save(inputObject) {
    console.log("function_save", inputObject);

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




    await db.db.writeDocument(inputObject);

    return await function_read(inputObject);

}




async function extractJSstructure(code) {

    try {
        // Parsing the JavaScript code to an AST
        const ast = esprima.parseScript(code);
        // Function to handle each node
        const nodeHandler = (node) => {
            console.log('Node Type:', node);
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
