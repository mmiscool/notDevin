import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateElementValues, updateSelectOptions} from './commonComponents.js';


let formFields;

async function setupForm() {
    formFields = await sendToApi("functions/schema", {});
    //alert(`formFields: ${JSON.stringify(formFields)}`);
    generateForm(formFields, "functionForm");
    await function_list();

}
setupForm();



const generateAllFunctionsButton = document.getElementById("generateAllFunctionsButton");





document.getElementById("newFunctionButton").addEventListener("click", function_new);

async function function_new() {
    // loop through the formFields object and set the value of each element to an empty string
    for (let key in formFields) {
        document.getElementById(key).value = "";
    }
}


document.getElementById("deleteFunctionButton").addEventListener("click", function_delete);

async function function_delete() {
    const id = document.getElementById("_id").value;
    const response = await sendToApi("functions/delete", { _id: id });
    console.log(response);
    await function_list();
    await function_new();
}



document.getElementById("saveFunctionButton").addEventListener("click", function_save);

async function function_save() {
    let saveObject = {};
    // filter widgets.formFields and return the value of each element
    for (let key in formFields) {
        saveObject[key] = document.getElementById(key).value;
    }

    console.log("saveObject", JSON.stringify(saveObject));

    const response = await sendToApi("functions/save", saveObject);

    console.log(response);

    await function_read(saveObject.functionName);
    await function_list();

}

document.getElementById("listFunctionsButton").addEventListener("click", function_list);

async function function_list() {
    const response = await sendToApi("functions/list", {});
    // make a list of strings from the items in the response object _id
    const functionNames = response.map(item => item._id);
    updateSelectOptions("functionNameList", functionNames);
}


document.getElementById("functionNameList").addEventListener("change", function () {
    const functionName = document.getElementById("functionNameList").value;

    function_read(functionName);
});




async function function_read(functionName) {
    function_new();
    const response = await sendToApi("functions/read", { _id: functionName});
    console.log("this is the record we got from the server", response);
    updateElementValues(response);
}


document.getElementById("generateFunctionButton").addEventListener("click", function_generate);

async function function_generate() {
    const id = document.getElementById("_id").value;
    await function_save();
    const response = await sendToApi("functions/generate", { _id: id });
    console.log(response);
    await function_read(id);
}






