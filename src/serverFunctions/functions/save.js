import { db } from "./schema.js";
import function_read from "./read.js";

export default async function function_save(inputObject) {
    console.log("function_save", inputObject);

    // remove these attributes from the object
    delete inputObject.action;
    delete inputObject.timeStamp;

    await db.db.writeDocument(inputObject);

    return await function_read(inputObject);

}




