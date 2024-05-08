
import { callLLM } from './llmCalls.js';
import { fileIOread, fileIOwrite, makeFolder, listFolders, fileIOdelete } from './fileIO.js';
import { askQuestion, selectItem, } from './gui.js';
import { launchEditor } from './editor.js';
import { executeCodeAsync } from './testCode.js';


let projectName;

async function main() {

  // get an array of the names of the folders in the projects folder
  const projectNames = await listFolders('./projects');
  if (projectNames.length === 0) {
    makeFolder('./projects');
    makeFolder('./projects/default');
  }

  projectName = await selectItem([...projectNames,
    "--------",
    "New project",
  ]);


  if (projectName === "New project") projectName = await askQuestion('enter project name:');

  if (projectName === null || projectName === '') projectName = 'default';
  makeFolder(`./projects/${projectName}`);
  makeFolder(`./projects/${projectName}/functions`);


  console.clear();
  // endless loop
  while (true) {
    console.log("\n\n\n");
    let currentMode = await selectItem([
      "mf - Make a function",
      "mc - Make a class",
      "mp - make a plan",
      "",
      "exit",
    ]);

    // set the value of currentMode to the first word of the string
    currentMode = currentMode.split(' ')[0];

    if (currentMode === 'exit') {
      console.log("Exiting...");
      break;
    }

    if (currentMode === 'clear') {
      console.clear();
      continue;
    }


    if (currentMode === 'mf') {
      console.clear();
      // make an array containing the names of the folders in the functions folder
      const functionNames = await listFolders(`./projects/${projectName}/functions/`);

      let functionName = await selectItem(["new function", " -------- ", ...functionNames]);

      if (functionName === "new function") {
        functionName = await askQuestion('New function name:');
      }


      await makeFunction(functionName);
      continue;
    };


  }
}

main();





async function makeFunction(functionName) {




  const functionPath = `./projects/${projectName}/functions/${functionName}`;

  await makeFolder(functionPath);


  let specFilePath = `${functionPath}/${functionName}.spec.md`;

  let currentSpecFileContents = await fileIOread(specFilePath);

  if (currentSpecFileContents == "") {
    const specTemplate = await fileIOread(`./promptTemplates/mf.spec.md`);
    await fileIOwrite(specFilePath, specTemplate);
  }

  let currentCodeContents = await fileIOread(`${functionPath}/${functionName}.js`);

  await launchEditor(specFilePath);
  currentSpecFileContents = await fileIOread(specFilePath);

  if (currentCodeContents == "") {
    currentCodeContents = `## Current code
${currentCodeContents}`;
  }


  let promptResult = await templateCallLLM("mf", {
    name: functionName,
    spec: currentSpecFileContents,
    currentCodeContents: currentCodeContents
  });


  promptResult = await replaceFirstFunctionName(promptResult, functionName);
  // promptResult = "this should make throw ERROR !!|";


  await fileIOwrite(`${functionPath}/${functionName}.js`, promptResult);


  await fileIOdelete(`${functionPath}/error.log`, true);
  const testResult = await executeCodeAsync(promptResult);


  if (testResult !== true) {
    console.log("Error executing code: ", testResult);
    // write the error to an error.log file
    await fileIOwrite(`${functionPath}/error.log`, JSON.stringify(testResult));
  } else {
    console.log("Test result: ", testResult);
  }


}



































function cleanupMarkdownCodeBlock(codeBlock) {
  //remove the string "```javascript" from the beginning of the code block
  //remove the string "```" from the end of the code block
  return codeBlock.replace("```javascript", "").replace("```", "");

}

function cleanupLeadingAndTrailingSpaces(codeBlock) {
  // get rid of leading and trailing spaces and leading and trailing newlines
  let trimedResult = codeBlock.trim();
  // get rid of leading and trailing newlines
  trimedResult = trimedResult.replace(/^\n+|\n+$/g, '');
  return trimedResult;
}

function replaceFirstFunctionName(codeSnippet, newName) {
  codeSnippet = cleanupMarkdownCodeBlock(codeSnippet);
  codeSnippet = cleanupLeadingAndTrailingSpaces(codeSnippet);



  // Regular expression to match function names in different declaration styles
  const functionRegex = /function\s+([\w$]+)\s*\(|([\w$]+)\s*=\s*function\s*\(/;

  // Replace the first occurrence of a function name
  return codeSnippet.replace(functionRegex, (match, p1, p2) => {
    // Check which group matched to ensure we replace correctly
    if (p1) {
      // Traditional function declaration
      return `function ${newName}(`;
    } else {
      // Function expression
      return `${newName} = function (`;
    }
  });
}



async function templateCallLLM(templateName, data) {
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