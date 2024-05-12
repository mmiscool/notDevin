import { db } from "./schema.js";

export default async function function_delete(inputObject) {
    console.log("function_delete", inputObject);
    const itemsRemoved = await db.db.deleteDocument({ _id: inputObject._id }, {});
    console.log("itemsRemoved", itemsRemoved);
    return itemsRemoved;
}