export async function executeCodeAsync(codeString) {
    console.log("Executing test code:", codeString)
    try {
        await eval(codeString);
        return true; // Return true if execution was successful
    } catch (error) {
        console.error("An error occurred while executing the code:", codeString, error);
        //return the error message as a JSON object
        return { error: error.message };
    }
}