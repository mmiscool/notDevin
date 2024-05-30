import { db } from "./schema.js";



export default async function function_read(inputObject) {
    //console.log("function_read", inputObject);

    const functionToRead = await db.db.readDocumentById(inputObject._id);

    return functionToRead
}
