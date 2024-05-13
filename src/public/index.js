import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, spinner_show, spinner_hide } from './commonComponents.js';


const functionsEditor = document.getElementById('functionsEditor');
const planEditor = document.getElementById('planEditor');
const compileEditor = document.getElementById('compileEditor');
const settingsEditor = document.getElementById('settingsEditor');
const showFunctionsEditorButton = document.getElementById('showFunctionsEditorButton');
const showPlanEditorButton = document.getElementById('showPlanEditorButton');
const compileButton = document.getElementById('compileButton');
const settingsButton = document.getElementById('settingsButton');

showFunctionsEditorButton.addEventListener('click', () => {
    hideIframes();
    functionsEditor.style.display = 'block';
});

showPlanEditorButton.addEventListener('click', () => {
    hideIframes();
    planEditor.style.display = 'block';
});

compileButton.addEventListener('click', async () => {
    hideIframes();
    compileEditor.style.display = 'block';
   
});


settingsButton.addEventListener('click', async () => {
    hideIframes();
    settingsEditor.style.display = 'block';

});


function hideIframes(){
    functionsEditor.style.display = 'none';
    planEditor.style.display = 'none';
    compileEditor.style.display = 'none';
    settingsEditor.style.display = 'none';
}


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
    compileEditor.src = `compileEditor.html?projectName=${projectName}`;

    showFunctionsEditorButton.click();
}

