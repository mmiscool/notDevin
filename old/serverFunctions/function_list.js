import { listFolders } from "../fileIO.js";


export default function function_list(inputObject){
    console.log(`our project name is ${inputObject.projectName}`);
    const listOfunctions = listFolders(`./projects/${inputObject.projectName}/functions/`);

    return { functions: listOfunctions };
}