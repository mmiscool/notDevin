import { sendToApi } from "./APIajaxRequest.js";
import { spinner_insert, setupTextareaAdjustment, adjustTextareaHeight } from './commonComponents.js';
spinner_insert();

const compileButton = document.getElementById("compileButton");
const codeText = document.getElementById("codeText");


compileButton.addEventListener("click", compile_build);



async function compile_build() {
    await setupTextareaAdjustment();

    console.log("compile_build");
    const codeResult = await sendToApi("compile_build", {});

    codeText.value = codeResult;
    adjustTextareaHeight(codeText);

}

// run on page load
window.onload = async function () {
    await setupTextareaAdjustment();
}