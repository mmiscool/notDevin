import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateSelectOptions } from './commonComponents.js';


document.getElementById("listModelsButton").addEventListener("click", listModels);
const modelName = document.getElementById("modelName");

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
    updateSelectOptions("modelsList", listOfModelNames);

}


document.getElementById("addModelButton").addEventListener("click", addModel);


async function addModel() {
    const response = await sendToApi("settings/addModel", {modelName :modelName.value} );
    console.log(response);
    listModels();
}



document.getElementById("deleteModelButton").addEventListener("click", deleteModel);

async function deleteModel() {
    const response = await sendToApi("settings/deleteModel",  {modelName :modelName.value});
    console.log(response);
    listModels();
}



document.getElementById("modelsList").addEventListener("change", function () {
    modelName.value = this.value;
});


// on page load event
document.addEventListener('DOMContentLoaded', async function () {
    await listModels();
});