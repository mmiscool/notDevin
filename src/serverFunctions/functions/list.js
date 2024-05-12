import { db } from './schema.js';

export default async function function_list(inputObject){
    //console.log("function_list", inputObject);
    const listOfFunctions = await db.db.findDocuments({projectName: inputObject.projectName});
    //console.log("this is the list of functions", listOfFunctions);
    return listOfFunctions;
}