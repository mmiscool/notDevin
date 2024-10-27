import { OpenAI } from "openai";
import { fileIOread } from "./fileIO.js";

let openAIApiKey = "Replace with openAI api key";
let openAIModel = "gpt-4o";

let openai = new OpenAI({ apiKey: openAIApiKey });

export async function templateCallLLM({ templateName, data, textOnly = true }) {
  console.log("doing the template llm call");

  // data contains an object with the data to be replaced in the template
  const promptTemplatePath = `./promptTemplates/${templateName}.md`;

  console.log(`Template path: ${promptTemplatePath}`);

  await console.log(data);

  let template = await fileIOread(promptTemplatePath);
  if (template === null) {
    console.log("Error loading template");
    return null;
  }

  for (const key in data) {
    template = await template.replace(`{${key}}`, data[key]);
  }

  let result;


  template = await templateString(template, data);

  console.log(template);
  result = await openai.chat.completions.create({
    model: openAIModel,
    messages: [
      {
        role: "system",
        content: `You are an expert with javascript, NURBS curves and surfaces, and 3D modeling. 
          You are creating functions that will be part of a 3D modeling library.`
      },
      {
        role: "user",
        content: template,
      },
    ],
  });


  if (!result) {
    console.log("Error: Could not get result from LLM");
    return null;
  }

  if (textOnly) return result.choices[0]?.message?.content;
  return result;
}




async function templateString(template, data) {
  for (const key in data) {
    template = await template.replace(`{${key}}`, data[key]);
  }

  return template;
}

export async function invokeLLMraw(request) {
  console.log(request);
  console.log(`doing the raw llm call, request: ${request.prompt}`);

  let result;


  result = await openai.chat.completions.create({
    model: openAIModel,
    messages: [
      {
        role: "system",
        content: `You are an expert with javascript, NURBS curves and surfaces, and 3D modeling. 
          You are creating functions that will be part of a 3D modeling library.`
      },
      {
        role: "user",
        content: request.prompt,
      },
    ],
  });


  if (!result) {
    console.log("Error: Could not get result from LLM");
    return null;
  }

  console.log(result.choices[0]?.message?.content);
  return result.choices[0]?.message?.content;
}
