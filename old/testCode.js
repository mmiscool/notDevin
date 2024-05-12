export async function executeCodeAsync(codeString) {
    //console.log("Executing test code:", codeString)
    if(codeString == null) return true;
    if(codeString == "") return true;
    try {
        console.log("Execute code test result "); 
        console.log( await eval(codeString + ";'';"));
        return true; // Return true if execution was successful
    } catch (error) {
        console.error("An error occurred while executing the code:", codeString, error);
        //return the error message as a JSON object
        return {
            errorString: `${error.message} ` + "\n" + `  ${error.stack}`,
            error: error
        };
    }
}