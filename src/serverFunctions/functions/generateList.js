import { db } from './schema.js';
import function_generate from './generate.js';

const debugMode = false;

export default async function function_generate_fromList(inputObject) {

    console.log("function_generate_fromList", inputObject.list);

    let list = inputObject.list;
    for (let i = 0; i < list.length; i++) {
        let inputObject = list[i];
        console.log("function_generate_fromList", inputObject);
        await function_generate({_id: inputObject});
    }
}
