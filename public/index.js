import { sendToApi } from "./APIajaxRequest.js";

const widgets = {
    projectName: document.getElementById("projectName"),
    listFunctionsButton: document.getElementById("listFunctionsButton"),
    functionNameList: document.getElementById("functionNameList"),
    functionName: document.getElementById("functionName"),
    saveFunctionButton: document.getElementById("saveFunctionButton"),
    generateFunctionButton: document.getElementById("generateFunctionButton"),
    functionArgs: document.getElementById("functionArgs"),
    spec: document.getElementById("spec"),
    code: document.getElementById("code"),
    errorLog: document.getElementById("errorLog"),
    requestData: document.getElementById("requestData")
};

// for the error log and request data text areas, make them read only
widgets.errorLog.readOnly = true;
widgets.requestData.readOnly = true;
widgets.projectName.value = "default";


widgets.listFunctionsButton.addEventListener("click", function_list);

widgets.functionNameList.addEventListener("change", function () {
    const functionName = widgets.functionNameList.value;
    widgets.functionName.textContent = functionName;
    function_read(functionName);
});

async function function_read(functionName) {
    const response = await sendToApi("function_read", { functionName: functionName });
    console.log(response);
    widgets.functionName.value = functionName;
    widgets.functionArgs.value = response.functionArgs;
    widgets.spec.value = response.spec;
    widgets.code.value = response.code;
    widgets.errorLog.value = response.errorLog;
    setupTextareaAdjustment();
}

widgets.saveFunctionButton.addEventListener("click", function_save);

async function function_save() {
    const functionName = widgets.functionName.value;
    const functionArgs = widgets.functionArgs.value;
    const spec = widgets.spec.value;
    const code = widgets.code.value;
    const response = await sendToApi("function_save", { functionName: functionName, functionArgs: functionArgs, spec: spec, code: code });
    console.log(response);
    await function_read(functionName);
}


widgets.generateFunctionButton.addEventListener("click", function_generate);

async function function_generate() {
    function_save();
    const functionName = widgets.functionName.value;
    const response = await sendToApi("function_generate", { functionName: functionName });
    console.log(response);
    function_read(functionName);
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
    function_list();
    setupTextareaAdjustment();
}

setUpPage();