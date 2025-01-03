import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateSelectOptions } from './commonComponents.js';



const promptTextarea = document.getElementById("promptTextarea");
const chatMessagesArea = document.getElementById("chatMessagesArea");

document.getElementById("submitButton").addEventListener("click", submitPrompt);
const modelsList = document.getElementById("modelsList");


spinner_insert();

let contextWindow = [];


// const defaultPromptTemplate = `
// Make a list of functions required to be present in a full featured NURBS library that handles 3D surfaces, curves, intersections and any other utility functions required. 
// This is to plan implementing these functions in javascript. Be sure to use javascript variables. Not C/C++ variable types. 

// also include a list of functions required to build a complete BREP kernel including extrude, revolve, sweep, loft, fillet, chamfer and shell.

// In the description for each function include a list of functions that function will depend on.  do not include ` characters in your response. 

// Make the list in this format:
// * functionName(arg1, arg2) : Short description of what function does. Depends on (functionName, functionName)
// `;

const defaultPromptTemplate = `
Make a list of functions required to be present in a full featured NURBS library that handles 3D surfaces, curves, intersections and any other utility functions required. 
This is to plan implementing these functions in javascript. Be sure to use javascript variables. Not C/C++ variable types. 
Function names should be camelCase and not be longer than 30 characters.

Also include a list of functions required to build a complete BREP kernel including extrude, revolve, sweep, loft, fillet, chamfer, and shell.

In the description for each function, include a list of functions that function will depend on. Do not include \` characters in your response. 
Each list item must be on a single line.

Make the list in this format (one function per line starting with *):
* functionName(arg1, arg2): Short description of what function does. Depends on (functionName, functionName)
`;



document.addEventListener('DOMContentLoaded', async function () {


});

promptTextarea.value = localStorage.lastTextPrompt || defaultPromptTemplate;

document.getElementById("clearButton").addEventListener("click", function () {
    promptTextarea.value = defaultPromptTemplate;
    chatMessagesArea.innerHTML = promptTextarea.value;
});


let lastModelUsed = "";

document.getElementById("parseInputString").addEventListener("click", function () {
    submitPrompt(true)
});


async function submitPrompt(doNotSend = false) {

    const UserChatBalloon = document.createElement("div");
    UserChatBalloon.classList.add("chatBalloon");
    UserChatBalloon.innerHTML = `<b>${promptTextarea.value}<b>`;

    const listOfUserInput = promptTextarea.value.split("\n").map(line => line.trim()).filter(line => line.length > 0);

    await outputListToChatArea(listOfUserInput, UserChatBalloon, true)



    chatMessagesArea.appendChild(UserChatBalloon);

    if (doNotSend === true) return;

    // store the currently selected model to local storage
    localStorage.setItem("selectedModel", modelsList.value);

    if (modelsList.value !== lastModelUsed) {
        // clear the chatMessagesArea
        //chatMessagesArea.innerHTML = "";
        lastModelUsed = modelsList.value;

        contextWindow = [];
    }

    const response = await sendToApi("planner/chat", {
        model: modelsList.value,
        role: 'user',
        prompt: promptTextarea.value,
        options: {
            seed: 123,
            temperature: 0,
            keep_alive: '24h',
        },
        context: contextWindow
    });

    console.log(response);
    localStorage.lastTextPrompt = promptTextarea.value;


    // create new div with css class of chatBalloon
    const chatBalloon = document.createElement("div");
    chatBalloon.classList.add("chatBalloon");

    // split response into trimmed lines array omitting empty lines



    const responseAsLinesArray = response.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    await outputListToChatArea(responseAsLinesArray, chatBalloon)


    chatMessagesArea.appendChild(chatBalloon);



    contextWindow = response.context;



    console.log(response);
    //document.getElementById("response").innerText = response;
}



async function outputListToChatArea(responseAsLinesArray, chatBalloon, addAstrics = false) {
    // loop over each line and make a div with the line as text and append it to chatBalloon
    for (let line of responseAsLinesArray) {
        const chatLine = document.createElement("div");
        if (addAstrics) {
            line = " * " + line;
        }
        chatLine.innerText = line;
        console.log(line);
        chatLine.classList.add("chatLine");
        chatBalloon.appendChild(chatLine);
        chatLine.addEventListener("click", function () {
            promptTextarea.value = line;
            // Toggle the class of the chatLine
            if (chatLine.classList.contains("chatLineHighlighted")) {
                chatLine.classList.remove("chatLineHighlighted");
                chatLine.classList.add("chatLine");
            } else {
                chatLine.classList.remove("chatLine");
                chatLine.classList.add("chatLineHighlighted");
            }
        });

    }
}













// When the user click the generateFunctionsFromSelected button call the generateFunctionsFromSelected function
document.getElementById("generateFunctionsFromSelected").addEventListener("click", generateFunctionsFromSelected);

async function generateFunctionsFromSelected() {
    console.log("generateFunctionsFromSelected");
    // get a list of all the elements with the class chatLineHighlighted
    const highlightedElements = document.getElementsByClassName("chatLineHighlighted");
    // create an array to store the text of the highlighted elements
    const functionsToMake = [];
    // loop over each highlighted element and push the text to the highlightedText array
    for (const element of highlightedElements) {
        try {
            let functionStringDefinition = element.innerText;
            functionStringDefinition = functionStringDefinition.trim();

            /*
            Strings will look like this:
            * createRationalNurbsCurve(controlPoints, weights, degree): Creates a Rational NURBS curve given control points, corresponding weights, and the curve's degree.
            */

            let newFunctionName = functionStringDefinition.split("(")[0].trim();
            // remove the first word from the string if there are more than one word
            newFunctionName = newFunctionName.split(" ").slice(1).join(" ");


            let argumentsList = functionStringDefinition.split("(")[1].split(")")[0].trim();
            let specification = functionStringDefinition.split(":")[1].trim();


            const functionToMake = {
                _id: newFunctionName,
                projectName: window.projectName,
                arguments: argumentsList,
                specification: specification,

            };


            functionsToMake.push(functionToMake);
            console.log(functionsToMake);
        } catch (e) {
            console.log(e);
            console.log(functionStringDefinition);
        }

    }



    const functionsToMakeRequestObject = {
        functionsToMake: functionsToMake
    };

    console.log(functionsToMakeRequestObject);
    sendToApi("planner/addFunctions", functionsToMakeRequestObject);

}


/*
        _id: {
            type: "string",
            userEditable: true,
            widget: "input",
            label: "Function Name",
            description: "The name of the function."
        },
        projectName: {
            type: "string",
            userEditable: false,
            widget: "input",
            label: "Project Name",
            description: "The name of the project this function belongs to."
        },
        arguments: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Arguments",
            description: "The arguments of the function."
        },
        specification: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Specification",
            description: "The specification of the function."
        },
        jsdoc: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "JSDoc",
            description: "The JSDoc of the function."
        },
        code: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Code",
            description: "The code of the function."
        },
        errorLogs: {
            type: "string",
            userEditable: false,
            widget: "textarea",
            label: "Error Logs",
            description: "The error logs of the function."
        },
*/