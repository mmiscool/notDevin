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
