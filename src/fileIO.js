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

// function to read a whole text file into a string
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

