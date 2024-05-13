import { sendToApi } from "./APIajaxRequest.js";
import './commonComponents.js';

document.getElementById("compileButton").addEventListener("click", compile_code);

async function compile_code() {
    const code = document.getElementById("codeText");

    const buildResult = await sendToApi("functions/build", {});

    console.log(buildResult);

    code.value = buildResult;
}