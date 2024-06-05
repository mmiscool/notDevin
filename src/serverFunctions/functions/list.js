import { db } from './schema.js';

const debugMode = false;

export default async function function_list(inputObject) {
    //console.log("function_list", inputObject);
    const listOfFunctions = await db.db.findDocuments({ projectName: inputObject.projectName });
    //console.log("this is the list of functions", listOfFunctions);

    // loop over all the functions and console log them
    for (let i = 0; i < listOfFunctions.length; i++) {

        if (listOfFunctions[i].code == "" || listOfFunctions[i].code == undefined) listOfFunctions[i].needsGeneration = "true";
        if (listOfFunctions[i].errorLogs != "") listOfFunctions[i].needsGeneration = "true";

        if (listOfFunctions[i].needsGeneration == "true"  && debugMode) console.log("Function: ", listOfFunctions[i]._id, "needs generation");
        //if (listOfFunctions[i]._id == "blendPoints") console.log("Function: ", listOfFunctions[i]._id, listOfFunctions[i].needsGeneration, listOfFunctions[i].code);
    }





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