import fs from 'fs';

const fileIOdebugMode = false;

export function fileIOwrite(fileName, data) {
    try {
        fs.writeFileSync(fileName, data);
        console.log(`File ${fileName} written successfully!`);
    } catch (err) {
        console.log(err);
    }
}

// function to read a whole text into a string
export function fileIOread(fileName) {
    //console.log('Reading file:', fileName);
    let fileContents = "";
    try {
        fileContents = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        if (fileIOdebugMode == true) console.log(err);
        console.log('Error reading file:', fileName);
        return "";  // Return null if there's an error
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



export function makeFolder(folderName) {
    // check if the folder exists
    if (!fs.existsSync(folderName)) {
        return fs.mkdirSync(folderName);
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