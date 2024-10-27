import function_save from "../functions/save.js";
import function_generate from "../functions/generate.js";


export default async function addFunctions(inputObject) {
    console.log("here I am");
    //loop through the array of functions and save them
    console.log("addFunctions.js inputObject", inputObject);
    for (const functionToMake of inputObject.functionsToMake) {
        try {
            //Remove all* characters from the functionToMake._id and trim any white space
            
            functionToMake._id = functionToMake._id.replace(/[*]/g, "").trim();
            // remove all ` charachters from the functionToMake._id
            functionToMake._id = functionToMake._id.replace(/`/g, "").trim();

            functionToMake.needsGeneration = "true";
            console.log("addFunctions.js functionToMake", functionToMake);
            await function_save(functionToMake);
        } catch (e) {
            console.log(e);
        }

    }


    for (const functionToMake of inputObject.functionsToMake) {
        try {
            console.log("addFunctions.js functionToMake", functionToMake);
            await function_generate(functionToMake);
        } catch (e) {
            console.log(e);
        }
    }



    return { success: true };

} 