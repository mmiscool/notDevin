const debugMode = false;


export function serverFunctionsCall(inputObject){
    
    if (debugMode)console.log("serverFunctionsCall called");
    if (debugMode)console.log(inputObject);

    const action = inputObject.action;

    // Return the Promise directly
    return import(`./serverFunctions/${action}.js`)
        .then(module => {
            if (debugMode)console.log(`Function for action ${action} loaded.`);
            // Return the result of the function call
            return module.default(inputObject);
        })
        .catch(error => {
            if (debugMode)console.error('Error:', error.message);
            return { error: error.message };
        });
}
