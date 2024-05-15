import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateSelectOptions } from './commonComponents.js';



const promptTextarea = document.getElementById("promptTextarea");
const chatMessagesArea = document.getElementById("chatMessagesArea");

document.getElementById("submitButton").addEventListener("click", submitPrompt);
const modelsList = document.getElementById("modelsList");


spinner_insert();

let contextWindow = [];



export async function listModels() {
    const myModelsList = await sendToApi("settings/listModels", {});
    const listOfModelNames = [];


    console.log(myModelsList);
    for (const model of myModelsList) {
        console.log(model);
        let modelNamToAdd = model.name;
        // split string on : and get the first element
        modelNamToAdd = modelNamToAdd.split(":")[0];

        listOfModelNames.push(modelNamToAdd);
    }

    await console.log(listOfModelNames);
    await updateSelectOptions("modelsList", listOfModelNames);

    // get the selected model from local storage
    const selectedModel = localStorage.getItem("selectedModel");
    if (selectedModel) {
        modelsList.value = selectedModel;
    }

}





document.addEventListener('DOMContentLoaded', async function () {
    await listModels();
});







async function submitPrompt() {

    const UserChatBalloon = document.createElement("div");
    UserChatBalloon.classList.add("chatBalloon");
    UserChatBalloon.innerHTML = `<b>${promptTextarea.value}<b>`;
    chatMessagesArea.appendChild(UserChatBalloon);

    // store the currently selected model to local storage
    localStorage.setItem("selectedModel", modelsList.value);

    const response = await sendToApi("planner/chat", {
        model: modelsList.value,
        role: 'user',
        prompt: promptTextarea.value,
        context: contextWindow
    });





    // create new div with css class of chatBalloon
    const chatBalloon = document.createElement("div");
    chatBalloon.classList.add("chatBalloon");

    // split response into trimmed lines array omitting empty lines



    const responseAsLinesArray = response.response.split("\n").map(line => line.trim()).filter(line => line.length > 0);

    // loop over each line and make a div with the line as text and append it to chatBalloon
    for (const line of responseAsLinesArray) {
        const chatLine = document.createElement("div");
        chatLine.innerText = line;
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

    chatMessagesArea.appendChild(chatBalloon);



    contextWindow = response.context;



    console.log(response);
    //document.getElementById("response").innerText = response;
}



// When the user click the generateFunctionsFromSelected button call the generateFunctionsFromSelected function
document.getElementById("generateFunctionsFromSelected").addEventListener("click", generateFunctionsFromSelected);

async function generateFunctionsFromSelected() {
    // get a list of all the elements with the class chatLineHighlighted
    const highlightedElements = document.getElementsByClassName("chatLineHighlighted");
    // create an array to store the text of the highlighted elements
    const functionsToMake = [];
    // loop over each highlighted element and push the text to the highlightedText array
    for (const element of highlightedElements) {
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
    }


    const functionsToMakeRequestObject = {
        functionsToMake: functionsToMake
    };
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