import fs from 'fs';

const fileIOdebugMode = false;

export function fileIOwrite(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            console.log(err);
        } else {
            if (fileIOdebugMode == true) console.log('File written successfully');
        }
    });
}

// function to read a whole text into a string
export function fileIOread(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        if (fileIOdebugMode == true) console.log(err);
        return "";  // Return null if there's an error
    }
}

export function fileIOdelete(fileName, silent = false) {
    fs.unlink(fileName, (err) => {
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
    return fs.readdirSync(folderName, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
