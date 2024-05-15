import { db } from './schema.js';

export default async function function_list(inputObject) {
    //console.log("function_list", inputObject);
    const listOfFunctions = await db.db.findDocuments({ projectName: inputObject.projectName });
    //console.log("this is the list of functions", listOfFunctions);
    return listOfFunctions;
}


export async function function_list_with_arguments(inputObject) {
    //console.log("function_list", inputObject);
    const listOfFunctions = await db.db.findDocuments({ projectName: inputObject.projectName });
    let listOfFunctionsWIthArguments = "";
    //console.log("this is the list of functions", listOfFunctions);

    // loop over the list of functions and add the arguments
    for (let i = 0; i < listOfFunctions.length; i++) {

        if (listOfFunctions[i]._id !== inputObject._id) {
            let functionWithArgsString = listOfFunctions[i]._id + "(" + listOfFunctions[i].arguments + ")";
            listOfFunctionsWIthArguments += functionWithArgsString + "\n";
        }

    }


    return listOfFunctionsWIthArguments;
}