import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, spinner_show, spinner_hide } from './commonComponents.js';


const functionsEditor = document.getElementById('functionsEditor');
const planEditor = document.getElementById('planEditor');
const showFunctionsEditorButton = document.getElementById('showFunctionsEditorButton');
const showPlanEditorButton = document.getElementById('showPlanEditorButton');

showFunctionsEditorButton.addEventListener('click', () => {
    functionsEditor.style.display = 'block';
    planEditor.style.display = 'none';
});

showPlanEditorButton.addEventListener('click', () => {
    functionsEditor.style.display = 'none';
    planEditor.style.display = 'block';
});



// run this function after the page is done loading
window.onload = async function () {
    await spinner_insert();
    spinner_hide();

    let projectName = new URLSearchParams(window.location.search).get('projectName');
    if (!projectName) projectName = prompt('Enter project name', 'default');

    document.getElementById('projectName').value = projectName;

    // modify the current URL to include the project name
    window.history.pushState({}, '', `?projectName=${projectName}`);

    // set iframe src to include the project name
    functionsEditor.src = `functionsEditor.html?projectName=${projectName}`;
    planEditor.src = `planEditor.html?projectName=${projectName}`;

    showFunctionsEditorButton.click();
}

