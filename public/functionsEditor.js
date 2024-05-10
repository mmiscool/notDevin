import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, spinner_hide, spinner_show } from './commonComponents.js';


const widgets = {
    listFunctionsButton: document.getElementById("listFunctionsButton"),
    generateAllFunctionsButton: document.getElementById("generateAllFunctionsButton"),
    newFunctionButton: document.getElementById("newFunctionButton"),
    functionNameList: document.getElementById("functionNameList"),
    functionName: document.getElementById("functionName"),
    saveFunctionButton: document.getElementById("saveFunctionButton"),
    generateFunctionButton: document.getElementById("generateFunctionButton"),
    functionArgs: document.getElementById("functionArgs"),
    spec: document.getElementById("spec"),
    jsdoc: document.getElementById("jsdoc"),
    code: document.getElementById("code"),
    errorLog: document.getElementById("errorLog"),
    requestData: document.getElementById("requestData")
};

// for the error log and request data text areas, make them read only
widgets.errorLog.readOnly = true;
widgets.requestData.readOnly = true;




widgets.newFunctionButton.addEventListener("click", function () {
    widgets.functionName.value = "";
    widgets.functionArgs.value = "";
    widgets.spec.value = "";
    widgets.jsdoc.value = "";
    widgets.code.value = "";
    widgets.errorLog.value = "";
    setupTextareaAdjustment();
});









widgets.listFunctionsButton.addEventListener("click", function_list);

widgets.functionNameList.addEventListener("change", function () {
    const functionName = widgets.functionNameList.value;
    widgets.functionName.textContent = functionName;
    function_read(functionName);
});

async function function_read(functionName) {
    console.log("function_read", functionName);
    const response = await sendToApi("function_read", { functionName: functionName });
    console.log(response);
    widgets.functionName.value = functionName;
    widgets.functionArgs.value = response.functionArgs;
    widgets.spec.value = response.spec;
    widgets.jsdoc.value = response.jsdoc;
    widgets.code.value = response.code;
    widgets.errorLog.value = response.errorLog;
    setupTextareaAdjustment();
}

widgets.saveFunctionButton.addEventListener("click", function () { function_save(); });

async function function_save(skipRead = false) {
    const functionName = widgets.functionName.value;
    const functionArgs = widgets.functionArgs.value;
    const spec = widgets.spec.value;
    const jsdoc = widgets.jsdoc.value;
    const code = widgets.code.value;
    const response = await sendToApi("function_save", {
        functionName,
        functionArgs,
        jsdoc,
        spec,
        code
    });
    console.log(response);

    if (skipRead === false) await function_read(functionName);
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



function adjustTextareaHeight(textarea) {
    // Reset the height to 'auto' to get the correct scroll height
    textarea.style.height = 'auto';
    // Set the height of textarea to its scroll height
    textarea.style.height = `${textarea.scrollHeight + 15}px`;
}

function setupTextareaAdjustment() {
    // Select all textarea elements on the page
    const textareas = document.querySelectorAll('textarea');

    // Iterate through each textarea
    textareas.forEach(textarea => {
        // Initially adjust the height
        adjustTextareaHeight(textarea);

        // Attach an input event listener to adjust height whenever the content changes
        textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
    });
}



async function setUpPage() {
    await spinner_insert();
    await spinner_hide();
    function_list();
    setupTextareaAdjustment();
}

setUpPage();