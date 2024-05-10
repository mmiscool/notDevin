

export async function sendToApi(apiName, objectToSend, spinner = true) {
    const apiTarget = './api'; // The API endpoint URL

    const newObjectToSend = JSON.parse(JSON.stringify(objectToSend));
    newObjectToSend.action = apiName;
    newObjectToSend.projectName = window.projectName;

    // Show the spinner before making the request
    if (spinner) document.getElementById("spinner").style.display = "block";

    // Prepare the fetch options
    const fetchOptions = {
        method: 'POST', // Method type
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObjectToSend) // Convert the JavaScript object to a JSON string
    };

    if (!spinner) {
        // Return the fetch promise directly
        return fetch(apiTarget, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error:', error.message);
                return { error: error.message };
            });
    }

    try {
        const response = await fetch(apiTarget, fetchOptions);

        // Hide the spinner after receiving the response
        document.getElementById("spinner").style.display = "none";

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Parse the JSON response and return it
    } catch (error) {
        console.error('Error:', error.message);
        // Hide the spinner also if an error occurs
        document.getElementById("spinner").style.display = "none";
        return { error: error.message };
    }
}
