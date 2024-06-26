import { db } from './schema.js';
import { fileIOwrite } from '../../fileIO.js';

const debugMode = false;

export default async function function_list(inputObject) {
    //console.log("function_list", inputObject);
    const listOfFunctions = await db.db.findDocuments({ projectName: inputObject.projectName });
    //console.log("this is the list of functions", listOfFunctions);

    // loop over all the functions and console log them
    for (let i = 0; i < listOfFunctions.length; i++) {

        if (listOfFunctions[i].code == "" || listOfFunctions[i].code == undefined) listOfFunctions[i].needsGeneration = "true";
        if (listOfFunctions[i].errorLogs != "") listOfFunctions[i].needsGeneration = "true";

        if (listOfFunctions[i].needsGeneration == "true" && debugMode) console.log("Function: ", listOfFunctions[i]._id, "needs generation");

        try {
            fileIOwrite("../projectData/" + inputObject.projectName + "/functions/" + listOfFunctions[i]._id + ".js", listOfFunctions[i].code);

            // make a markdown file with the specificaion of the function
            let functionSpecification = "";
            functionSpecification += "## " + listOfFunctions[i]._id + "\n";
            functionSpecification += "### Arguments: \n";
            functionSpecification += listOfFunctions[i].arguments + "\n";
            functionSpecification += "### Specification: \n";
            functionSpecification += listOfFunctions[i].specification + "\n";
   


            fileIOwrite("../projectData/" + inputObject.projectName + "/functions/" + listOfFunctions[i]._id + ".md", functionSpecification);

            console.log(listOfFunctions[i]);
        } catch (err) {
            console.log(err);
        }




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