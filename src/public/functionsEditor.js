import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateElementValues} from './commonComponents.js';


let formFields;

async function setupForm() {
    formFields = await sendToApi("functions/schema", {});
    //alert(`formFields: ${JSON.stringify(formFields)}`);
    generateForm(formFields, "functionForm");
    function_list();

}
setupForm();


document.getElementById("newFunctionButton").addEventListener("click", function_new);

function function_new() {
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
    function_list();
    function_new();
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
    function_list();

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





// widgets.generateAllFunctionsButton.addEventListener("click", function_generate_all);

// function function_generate_all() {
//     const functionNameList = widgets.functionNameList.options;
//     for (let i = 0; i < functionNameList.length; i++) {
//         const functionName = functionNameList[i].value;

//         sendToApi("function_generate", { functionName: functionName }, false);
//     }
// }






function updateSelectOptions(selectID, options) {
    const select = document.getElementById(selectID);
    // Clear existing options
    select.innerHTML = '';
    select.size = options.length + 1;

    // Loop through the array of options
    options.forEach(function (optionText) {
        // Create a new option element
        var option = document.createElement('option');

        // Set the text content and value of the option
        option.textContent = optionText;
        option.value = optionText;

        // Add the option to the select element
        select.appendChild(option);
    });
}

