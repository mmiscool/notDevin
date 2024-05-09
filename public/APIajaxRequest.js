export async function sendToApi(apiName, objectToSend) {
    const apiTarget = './api'; // The API endpoint URL

    const newObjectToSend = JSON.parse(JSON.stringify(objectToSend));
    newObjectToSend.action = apiName;
    newObjectToSend.projectName = document.getElementById("projectName").value;



    try {
        const response = await fetch(apiTarget, {
            method: 'POST', // Method type
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObjectToSend) // Convert the JavaScript object to a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Parse the JSON response and return it
    } catch (error) {
        console.error('Error:', error.message);
        return { error: error.message };
    }
}