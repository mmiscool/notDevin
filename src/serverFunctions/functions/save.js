import { db } from "./schema.js";
import function_read from "./read.js";

export default async function function_save(inputObject) {
    console.log("function_save", inputObject);

    // remove these attributes from the object
    delete inputObject.action;
    delete inputObject.timeStamp;


    // check if te object contains all the required fields specified in the schema and if fields are missing add them with an empty string
 for (const key in db.schema) {
        if (!inputObject[key]) {
            console.log("missing key", key);
            inputObject[key] = "";
        }
    }




    await db.db.writeDocument(inputObject);

    return await function_read(inputObject);

}




