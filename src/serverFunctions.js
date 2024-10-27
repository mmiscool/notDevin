const debugMode = true;

import addFunctions from "./serverFunctions/planner/addFunctions.js";


export function serverFunctionsCall(inputObject) {

    if (debugMode) console.log("serverFunctionsCall called");
    //if (debugMode) console.log(inputObject);

    const action = inputObject.action;

    if (debugMode) console.log(`Action: ${action}`);

    // Return the Promise directly
    return import(`./serverFunctions/${action}.js`)
        .then(module => {
            if (debugMode) console.log(`Function for action ${action} loaded.`);
            // Return the result of the function call
            return module.default(inputObject);
        })
        .catch(error => {
            console.error('Error:', error.message);
            console.log('Error:', error);
            return { error: error.message };
        });
}
