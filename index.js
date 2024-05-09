
import { makeFolder, listFolders } from './fileIO.js';
import { askQuestion, selectItem, } from './gui.js';
import { server } from './server.js';
import { makeFunction } from './functionGenerator/functionGenerator.js';


export let projectName = 'default';

async function main() {

  // get an array of the names of the folders in the projects folder
  const projectNames = await getProjectsList();
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


export async function getProjectsList() {
  const projectNames = await listFolders('./projects');
  return projectNames;
}












