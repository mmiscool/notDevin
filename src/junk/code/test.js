#!/usr/bin/env node

// Import statements at the top of your file
import fs from 'fs';
import esprima from 'esprima';
import estraverse from 'estraverse';

// Read the JavaScript file
const code = fs.readFileSync('./mergeMe.js', 'utf8');

// Parse the code with Esprima
const ast = esprima.parse(code, {
    sourceType: 'module', // Add this line
    range: true,
    comment: true,
    tokens: true,
    attachComment: true,
});

// Function to get leading comments
function getLeadingComments(node, code, comments) {
    const leadingComments = [];
    let nodeStart = node.range[0];

    for (let i = comments.length - 1; i >= 0; i--) {
        const comment = comments[i];
        if (comment.range[1] <= nodeStart) {
            const between = code.substring(comment.range[1], nodeStart);
            if (/^[\s]*$/.test(between)) {
                leadingComments.unshift(comment);
                nodeStart = comment.range[0];
            } else {
                break;
            }
        }
    }

    return leadingComments;
}

// Array to store modifications
const functionModifications = [];

// Traverse the AST
estraverse.traverse(ast, {
    enter(node, parent) {
        if (node.type === 'FunctionDeclaration') {
            const leadingComments = getLeadingComments(node, code, ast.comments);
            const start = leadingComments.length > 0 ? leadingComments[0].range[0] : node.range[0];
            const end = node.range[1];
            const functionCode = code.substring(start, end);

            console.log('Function:', node.id.name);
            console.log(functionCode);

            // Modify the functionCode as needed
            const modifiedFunctionCode = functionCode; // Apply your modifications here

            functionModifications.push({
                start,
                end,
                code: modifiedFunctionCode,
            });
        }
    },
});

// Sort modifications by start position
functionModifications.sort((a, b) => a.start - b.start);

let result = '';
let lastIndex = 0;

// Merge the modified functions back into the original code
functionModifications.forEach((mod) => {
    result += code.substring(lastIndex, mod.start);
    result += mod.code;
    lastIndex = mod.end;
});

result += code.substring(lastIndex);

// Write the modified code back to a file
fs.writeFileSync('modifiedFile.js', result, 'utf8');
