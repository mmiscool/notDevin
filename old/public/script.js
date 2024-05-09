
const widgets = {
    projectName: document.getElementById("projectName"),
    functionName: document.getElementById("functionName"),
    functionNameDisplay: document.getElementById("functionNameDisplay"),
    generateFunctionButton: document.getElementById("generateFunctionButton"),
    output: document.getElementById("output"),
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

async function makeAjaxCall(objectToSend, endpoint) {
    objectToSend.projectName = widgets.projectName.value;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToSend)
    });
    const data = await response.json();
    console.log("return Data", data);
    return data;
}

async function aiCall(objectToSend) {
    const endpoint = "./api";
    objectToSend.projectName = widgets.projectName.value;

    //console.log(objectToSend);
    const response = await makeAjaxCall(objectToSend, endpoint);
    return response;
}

async function listFunctions() {
    const objectToSend = {
        action: "function.list"
    };

    const response = await aiCall(objectToSend);
    console.log(response);
    updateSelectOptions(widgets.functionName, response.functions);


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

setupTextareaAdjustment();

async function functionRead() {
    const objectToSend = {
        action: "function.read",
        functionName: widgets.functionName.value
    };
    const response = await aiCall(objectToSend);
    console.log(response);

    widgets.functionArgs.value = response.functionArgs;
    widgets.spec.value = response.spec;
    widgets.code.value = response.code;
    widgets.errorLog.value = response.errorLog;
    widgets.requestData.value = response.requestData;
    widgets.functionNameDisplay.innerHTML = widgets.functionName.value;
    //await setupTextareaAdjustment();
    setupTextareaAdjustment();
}

async function functionGenerate() {
    const objectToSend = {
        action: "function.generator",
        functionName: widgets.functionName.value
    };
    const response = await aiCall(objectToSend);
    console.log(response);
    await functionRead();
}




// setup an onclick event for the generateFunctionButton
widgets.generateFunctionButton.addEventListener('click', functionGenerate);

// setup an onclick event for the functionName select element and console.log the selected value
widgets.functionName.addEventListener('change', functionRead);


async function pageSetup() {
    await listFunctions();
}

pageSetup();


