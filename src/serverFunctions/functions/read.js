import { db } from "./schema.js";

export default function function_read(inputObject) {
    //console.log("function_read", inputObject);
    return db.db.readDocumentById(inputObject._id);
}
