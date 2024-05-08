import ollama from 'ollama';

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
  console.log(`running Prompt: ${prompt}`);
  let chatConfig = {
    model,
    role: user,
    content: prompt
  };

  return await invokeLLM(chatConfig);  // Return the result from invokeLLM
}
