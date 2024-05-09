import ollama from 'ollama';
import { fileIOread } from './fileIO.js';

async function invokeLLM(props) {
  //console.log(`-----`);
  //console.log(`[${props.model}]: ${props.content}`);
  //console.log(`-----`);
  try {
    console.log(`Running prompt...`);
    const response = await ollama.chat({
      model: props.model,
      messages: [{ role: props.role, content: props.content }],
    });
    //console.log(`${response.message.content}\n`);
    return response.message.content;  // Return the response content
  } catch (error) {
    console.error(`Query failed!`);
    console.error(error);
    return null;  // Return null in case of error
  }
}

export async function callLLM(prompt, model = "codegemma", user = "user") {
  model = "phi3";
  console.log(`running Prompt: ${prompt}`);
  let chatConfig = {
    model,
    role: user,
    content: prompt
  };

  return await invokeLLM(chatConfig);  // Return the result from invokeLLM
}


// function to pull a specific model from the API
export async function installModel(modelName, forceInstall = false) {

  // check if the model is already installed
  const models = await ollama.list();

  //const model = models.models.find(m => m.name === modelName);
  // modelName in the models.models list has a : character between the model name and the version number
  // so we need to split the string and get the first element

  const model = models.models.find(m => m.name.split(":")[0] === modelName);



  if (model && !forceInstall) {
    console.log(`Model ${modelName} already installed!`);
    return;
  }




  try {
    const response = await ollama.pull({ model: modelName });
    console.log(`Model installed successfully!`);
    console.log(response);
  } catch (error) {
    console.error(`Model installation failed!`);
    console.error(error);
  }
}


// function to list avaiable models from the ollama API
export async function listModels() {
  try {
    const response = await ollama.list();
    console.log(`Models available:`);
    console.log(response);
  } catch (error) {
    console.error(`Model listing failed!`);
    console.error(error);
  }
}


// installModel("phi3");
// installModel("codegemma");
// installModel("codellama");
// installModel("llama2");




export async function templateCallLLM(templateName, data) {
  // data contains an object with the data to be replaced in the template
  let template = await fileIOread(`./promptTemplates/${templateName}.md`);
  if (template === null) {
    console.log("Error loading template");
    return null;
  }
  for (const key in data) {
    template = template.replace(`{${key}}`, data[key]);
  }



  return callLLM(template);
}

//listModels();
