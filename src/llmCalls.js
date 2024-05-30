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
      options: {
        "keep_alive":'24h',
        "num_ctx": 100000,
      }
    });
    //console.log(`${response.message.content}\n`);
    return response.message.content;  // Return the response content
  } catch (error) {
    console.error(`Query failed!`);
    console.error(error);
    return null;  // Return null in case of error
  }
}

export async function invokeLLMraw(props) {
  try {
    console.log(`Running prompt...`);
    const response = await ollama.generate(props);
    //console.log(response);
    return response;  // Return the response content
  } catch (error) {
    console.error(`Query failed!`);
    console.error(error);
    return null;  // Return null in case of error
  }

}



export async function callLLM(prompt, model = "codegemma", user = "user") {
  console.log(`running Prompt: --------------------------------------------------------- \n${prompt}`);
  let chatConfig = {
    model,
    role: user,
    content: prompt
  };

  const response = await invokeLLM(chatConfig);  // Call the invokeLLM function
  console.log(`Response: --------------------------------------------------------------- \n${response}`);  // Log the response
  console.log(`LLM request completed: -------------------------------------------------- \n`)
  return response;
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
    let currentDigestDone = false
    const stream = await ollama.pull({ model: modelName, stream: true })
    for await (const part of stream) {
      if (part.digest) {
        let percent = 0
        if (part.completed && part.total) {
          percent = Math.round((part.completed / part.total) * 100)
        }
        process.stdout.clearLine(0) // Clear the current line
        process.stdout.cursorTo(0) // Move cursor to the beginning of the line
        process.stdout.write(`${part.status} ${percent}%...`) // Write the new text
        if (percent === 100 && !currentDigestDone) {
          console.log() // Output to a new line
          currentDigestDone = true
        } else {
          currentDigestDone = false
        }
      } else {
        console.log(part.status)
      }
    }


    // const response = await ollama.pull({ model: modelName });
    console.log(`Model installed successfully!`);
    // console.log(response);
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


installModel("phi3");
installModel("mistral")
// installModel("codegemma");
// installModel("codellama");
// installModel("llama2");




export async function templateCallLLM(templateName, data) {
  // data contains an object with the data to be replaced in the template
  const promptTemplatePath = `./promptTemplates/${templateName}.md`;

  console.log(`Template path: ${promptTemplatePath}`);

  if (!data.model | data.model == "") data.model = await fileIOread(promptTemplatePath + ".model", "phi3");
  if (!data.user | data.user == "") data.user = await fileIOread(promptTemplatePath + ".user", "user");


  await console.log(data);


  let template = await fileIOread(promptTemplatePath);
  if (template === null) {
    console.log("Error loading template");
    return null;
  }

  await installModel(data.model);

  for (const key in data) {
    template = await template.replace(`{${key}}`, data[key]);
  }

  return await callLLM(template, data.model, data.user);
}

//listModels();

