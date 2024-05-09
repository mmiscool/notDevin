import readline from 'readline';

import inquirer from 'inquirer';


export async function selectItem(choices, displayEnterOptions = false) {
    // Adding an option for entering custom text

    let enhancedChoices = [...choices];

    if (displayEnterOptions === true) {
        enhancedChoices = [
            ...choices,
            new inquirer.Separator(),
            { name: 'Enter custom text', value: 'custom' },
            new inquirer.Separator(),
        ];
    }




    // First question: choose from list or enter custom
    const listQuestion = {
        type: 'list',
        name: 'selection',
        message: 'Choose option:',
        pageSize: 20,
        choices: enhancedChoices,
    };

    try {
        let answers = await inquirer.prompt([listQuestion]);
        if (answers.selection === 'custom') {
            // Second question: input custom text
            const inputQuestion = {
                type: 'input',
                name: 'customText',
                message: 'Enter your text:',
            };
            answers = await inquirer.prompt([inputQuestion]);
            return answers.customText;
        } else {
            return answers.selection;
        }
    } catch (error) {
        console.error('Error in selection:', error);
        return null;
    }
}



export async function askQuestion(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


