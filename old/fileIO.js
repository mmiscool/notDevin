import fs from 'fs';
import { dirname } from 'path';


const fileIOdebugMode = false;

export async function fileIOwrite(fileName, data) {
    const dirPath = dirname(fileName);
    await makeFolder(dirPath);
    
    try {
        fs.writeFileSync(fileName, data);
        if (fileIOdebugMode == true) console.log(`File ${fileName} written successfully!`);
    } catch (err) {
        console.log(err);
    }
}

// function to read a whole text into a string
export function fileIOread(fileName, createIfNotExist = false) {
    //console.log('Reading file:', fileName);
    let fileContents = "";
    try {
        fileContents = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        if (fileIOdebugMode == true) console.log('Error reading file:', fileName);
        if (createIfNotExist) {
            fileIOwrite(fileName, createIfNotExist);
            return createIfNotExist;
        }
        return "";  // Return empty string if file dose not exist 
    }

    //console.log('File contents:', fileContents);

    return fileContents;
}

export function fileIOdelete(fileName, silent = false) {
    return fs.unlink(fileName, (err) => {
        if (err) {
            if (!silent) console.log(err);
        } else {
            if (fileIOdebugMode == true) console.log('File deleted successfully');
        }
    });
}


export function fileIOdeleteFolder(folderName) {
    return fs.rmdir(folderName, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (fileIOdebugMode == true) console.log('Folder deleted successfully');
        }
    });
}


export async  function makeFolder(folderName) {
    // check if the folder exists
    if (!fs.existsSync(folderName)) {
        return await fs.mkdirSync(folderName, { recursive: true });
    }
}


//return list of folder in specific directory
export function listFolders(folderName) {

    try {
        return fs.readdirSync(folderName, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (err) {
        if (fileIOdebugMode == true) console.log(err);
        return [];
    }
}




export async function storeObject(filePath, inputObject) {
    for (let key in inputObject) {
        if (inputObject.hasOwnProperty(key)) { // This check is to ensure you're not iterating over inherited properties
            // skip loop itteration if key is one of the following. "action", "functionName", "projectName"
            if (key === "action" || key === "functionName" || key === "projectName") {
                continue;
            }
            // make a new string based on the key but replacing the _ character with a . character
            let storageFileName = `${key.replace(/_/g, ".")}`;

            // if the key is a string, then write the value to a file
            if (typeof inputObject[key] === "string") {
                await fileIOwrite(`${filePath}.${storageFileName}`, inputObject[key]);
            }

            // if the key is a number, then write the value to a file
            if (typeof inputObject[key] === "number") {
                await fileIOwrite(`${filePath}.${storageFileName}`, inputObject[key]);
            }
        }
    }
}


export async function readObject(filePath, object ) {
    let files = fs.readdirSync(filePath);
    for (let file of files) {
        let key = file.replace(/\./g, "_");
        // get rid of the text before the first _ including the _
        key = key.replace(/^[^_]*_/, "");
        object[key] = fileIOread(`${filePath}/${file}`);
    }
    return object;
}