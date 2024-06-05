import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, generateForm, updateElementValues, updateSelectOptions } from './commonComponents.js';


let formFields;

async function setupForm() {
    formFields = await sendToApi("functions/schema", {});
    //alert(`formFields: ${JSON.stringify(formFields)}`);
    await generateForm(formFields, "functionForm");
    await function_list();

    

}
setupForm();



document.getElementById("generateSelected").addEventListener("click", function_generateSelected);

async function function_generateSelected() {
    const checkboxes = document.querySelectorAll("#functionListTable input[type=checkbox]");
    const selectedIds = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    console.log("selectedIds", selectedIds);

    sendToApi("functions/generateList", { list: selectedIds });
}





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


    await function_list();
    await function_read(saveObject._id);
    //alert(`Saved function ${saveObject.functionName}`);
}

document.getElementById("listFunctionsButton").addEventListener("click", function_list);

async function function_list() {
    const response = await sendToApi("functions/list", {});
    generateFunctionListTable(response);
}



async function generateFunctionListTable(list) {
    const table = document.getElementById("functionListTable");
    table.innerHTML = "";

    // create a header row
    let headerRow = table.insertRow(-1);
    let headerCell = headerRow.insertCell(-1);
    // make a checkbox that will check all the checkboxes in the table
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", function () {
        const checkboxes = document.querySelectorAll("#functionListTable input[type=checkbox]");
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    });
    headerCell.appendChild(checkbox);
    
    headerCell = headerRow.insertCell(-1);
    headerCell.innerHTML = "Function Name";
    headerCell = headerRow.insertCell(-1);
    headerCell.innerHTML = "Error";

    // add header column for needsGeneration and lastGenerated fields
    headerCell = headerRow.insertCell(-1);
    headerCell.innerHTML = "Generated";




    list.forEach(item => {
        // create a row for each item in the list
        let row = table.insertRow(-1);

        let cell = row.insertCell(-1);



        // make the first column be a checkbox that can be used to select the row
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item._id;
        cell.appendChild(checkbox);
        cell = row.insertCell(-1);
        // add an event listener to each cell except the for the select checkbox
        cell.addEventListener("click", function () {
            function_read(item._id);
        });
        cell.innerHTML = item._id;
        cell = row.insertCell(-1);
        // add an event listener to each cell except the for the select checkbox
        cell.addEventListener("click", function () {
            function_read(item._id);
        });
        cell.innerHTML = item.errorLogs == "" ? "" : "❌";

        // add a column for needsGeneration and lastGenerated fields
        cell = row.insertCell(-1);
        cell.innerHTML = item.needsGeneration == "true" ? "❌" : "✅";



    });

}


// document.getElementById("functionNameList").addEventListener("change", function () {
//     const functionName = document.getElementById("functionNameList").value;

//     function_read(functionName);
// });




async function function_read(functionName) {
    function_new();
    const response = await sendToApi("functions/read", { _id: functionName });
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
