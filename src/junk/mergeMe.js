#!/usr/bin/env node

import * as acorn from 'acorn';
import escodegen from 'escodegen';
import { print } from './debugHandler.js';

print.debugMode = true;
// First object string
const object1String = `
const daTing = {
    addTwoNumbers: function (a, b) {
        let temp = a + b;
        return temp;
    },
    divideTwoNumbers: function (a, b) {
        return a / b;
    }
};
`;

// Second object string
const object2String = `
const daTing = {

    addTwoNumbers: function (a, b) {
        return a + b;
    },

    multiplyNumbers: function (a, b) {
        return a * b;
    },
};
`;



function mergeObjectsFromStrings(objectBeingModified, objectWithOverides) {
    // Parse the strings into ASTs
    const object1AST = acorn.parse(objectBeingModified, { ecmaVersion: 2020 });
    const object2AST = acorn.parse(objectWithOverides, { ecmaVersion: 2020 });



    // Extract and merge the object properties from both ASTs
    const object1Properties = object1AST.body[0].declarations[0].init;
    const object2Properties = object2AST.body[0].declarations[0].init;

    const mergedObjectAST = mergeObjects(object1Properties, object2Properties);

    // Replace the object in the second AST with the merged object
    object2AST.body[0].declarations[0].init = mergedObjectAST;

    // Generate code from the merged AST
    const mergedCode = escodegen.generate(object2AST);

    // Output the merged code
    print(mergedCode);

    return mergedCode;

}



// Helper function to merge two object AST nodes
function mergeObjects(object1Node, object2Node) {
    const properties = {};

    // Extract properties from the first object
    object1Node.properties.forEach(prop => {
        properties[prop.key.name] = prop;
    });

    // Add/override properties from the second object
    object2Node.properties.forEach(prop => {
        properties[prop.key.name] = prop;
    });

    // Create a new object expression with merged properties
    return {
        type: 'ObjectExpression',
        properties: Object.values(properties)
    };
}


//console.log("This is the results", mergeObjectsFromStrings(object1String, object2String));