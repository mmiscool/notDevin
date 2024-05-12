import { sendToApi } from "./APIajaxRequest.js";
import { setupTextareaAdjustment } from "./commonComponents.js";
import { spinner_insert, spinner_hide, spinner_show } from './commonComponents.js';


const widgets = {
    listFunctionsButton: document.getElementById("listFunctionsButton"),
    generateAllFunctionsButton: document.getElementById("generateAllFunctionsButton"),
    newFunctionButton: document.getElementById("newFunctionButton"),
    functionNameList: document.getElementById("functionNameList"),
    functionName: document.getElementById("functionName"),
    saveFunctionButton: document.getElementById("saveFunctionButton"),
    generateFunctionButton: document.getElementById("generateFunctionButton"),
    deleteFunctionButton: document.getElementById("deleteFunctionButton"),
    formFields: [],

};



widgets.newFunctionButton.addEventListener("click", function_new);


function function_new() {
    const formFields = widgets.formFields;
    for (let key in formFields) {
        formFields[key].value = "";
    }
    setupTextareaAdjustment();
}






widgets.listFunctionsButton.addEventListener("click", function_list);

widgets.functionNameList.addEventListener("change", function () {
    const functionName = widgets.functionNameList.value;
    widgets.formFields.functionName.value = functionName;
    function_read(functionName);
});

async function function_read(functionName) {
    console.log("function_read", functionName);
    const response = await sendToApi("function_read", { functionName: functionName });
    console.log(response);


    // loop over all the string keys in the response object and update the corresponding textarea where the key matches the id of the textarea
    const formFields = widgets.formFields;

    for (let key in response) {
        if (typeof response[key] === "string") {
            if (key in formFields) {

                try {
                    formFields[key].value = response[key];
                } catch (error) {
                    console.log("error", error);
                    console.log(key);
                    console.log(formFields[key]);
                    console.log(response[key]);
                }

            }
        }
    }





    setupTextareaAdjustment();
}

widgets.saveFunctionButton.addEventListener("click", function () { function_save(); });

async function function_save(skipRead = false) {

    console.log("here are all them form fields  ")
    console.log(widgets.formFields);

    let saveObject = {};
    // filter widgets.formFields and return the value of each element
    for (let key in widgets.formFields) {
        saveObject[key] = widgets.formFields[key].value;
    }

    console.log("saveObject", JSON.stringify(saveObject));

    const response = await sendToApi("function_save", saveObject);

    console.log(response);

    if (skipRead === false) await function_read(saveObject.functionName);
}

widgets.deleteFunctionButton.addEventListener("click", function_delete);

async function function_delete() {
    // confirm with the user that they really want to delete the function
    if (!confirm("Are you sure you want to delete this function?")) return;

    const functionName = widgets.functionName.value;
    const response = await sendToApi("function_delete", { functionName: functionName });
    console.log(response);
    function_new();
    function_list();
}


widgets.generateFunctionButton.addEventListener("click", function_generate);

async function function_generate() {
    const functionName = widgets.functionName.value;
    await function_save();
    await function_read(functionName);

    const response = await sendToApi("function_generate", { functionName: functionName });
    console.log(response);
    function_read(functionName);
}


widgets.generateAllFunctionsButton.addEventListener("click", function_generate_all);

function function_generate_all() {
    const functionNameList = widgets.functionNameList.options;
    for (let i = 0; i < functionNameList.length; i++) {
        const functionName = functionNameList[i].value;

        sendToApi("function_generate", { functionName: functionName }, false);
    }
}



async function function_list() {
    const response = await sendToApi("function_list", {});
    console.log(response);
    updateSelectOptions(widgets.functionNameList, response.functions);
}



function updateSelectOptions(select, options) {
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



async function setUpPage() {
    await spinner_insert();
    await spinner_hide();


    const functionForm = document.getElementById("functionForm");
    console.log(functionForm);
    // itterate over the form elements and make a list of all the textareas and text inputs
    const formElements = functionForm.childNodes;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
            widgets.formFields[element.id] = element;
        }
    }

    widgets.formFields.code_js.readOnly = true;




    function_list();
    setupTextareaAdjustment();
}

setUpPage();