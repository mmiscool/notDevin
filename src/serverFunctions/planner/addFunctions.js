import function_save from "../functions/save.js";
import function_generate from "../functions/generate.js";

console.log("addFunctions.js");



export default async function addFunctions(inputObject) {
    //loop through the array of functions and save them
    for (const functionToMake of inputObject.functionsToMake) {
        //Remove all* characters from the functionToMake._id and trim any white space
        functionToMake._id = functionToMake._id.replace(/[*]/g, "").trim();
        functionToMake.needsGeneration = "true";
        await function_save(functionToMake);
        await function_generate(functionToMake);
    }



    return { success: true };

}