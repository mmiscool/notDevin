function getTessellation(listOfExistingFunctions, arguments, specification) {
    try {
        const code = arguments;
        const functionNames = Object.keys(code);
        let isFound = false;
        const functionName = functionNames.filter(func => code[func].toString().includes('_id'));
        if (functionName.length > 0) {
            isFound = true;
        } else {
            for (let f in code) {
                code[f] = code[f].toString();
                code[f] = 'function ' + f + ' ' + code[f].slice(code[f].indexOf('('));
            }
            code._id = code._id.toString();
            code._id = 'function _id ' + code._id.slice(code._id.indexOf('('));
            isFound = true;
        }
        if (!isFound) {
            throw new Error('Error: functionName _id does not exist in the arguments');
        }
        const libraryFunctions = Object.keys(listOfExistingFunctions);
        for (let i = 0; i < libraryFunctions.length; i++) {
            delete code[libraryFunctions[i]];
        }
        const updatedFunctionNames = Object.keys(code);
        const updatedValues = Object.values(code);
        const outputObj = {};
        for (let i = 0; i < updatedFunctionNames.length; i++) {
            outputObj[updatedFunctionNames[i]] = new Function('return ' + updatedValues[i]);
        }
        return outputObj;
    } catch (e) {
        console.error(e);
        return { 'error': e.message };
    }
}