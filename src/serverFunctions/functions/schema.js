import { Database } from "../../database.js";
export default function schema() {
    return {
        _id: {
            type: "string",
            userEditable: true,
            widget: "input",
            label: "Function Name",
            description: "The name of the function."
        },
        projectName: {
            type: "string",
            userEditable: false,
            widget: "input",
            label: "Project Name",
            description: "The name of the project this function belongs to."
        },
        arguments: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Arguments",
            description: "The arguments of the function."
        },
        specification: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Specification",
            description: "The specification of the function."
        },
        jsdoc: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "JSDoc",
            description: "The JSDoc of the function."
        },
        code: {
            type: "string",
            userEditable: true,
            widget: "textarea",
            label: "Code",
            description: "The code of the function."
        },
        errorLogs: {
            type: "string",
            userEditable: false,
            widget: "textarea",
            label: "Error Logs",
            description: "The error logs of the function."
        },
        lastGenerated: {
            type: "string",
            userEditable: false,
            widget: "input",
            label: "Last Generated",
            description: "The date the function was last generated."
        },
        needsGeneration: {
            type: "string",
            userEditable: false,
            widget: "input",
            label: "Needs Generation",
            description: "Does the function need to be generated?"
        }

    }

}


export const db = {
    db: new Database("functions.json"),
    schema: schema,
}
