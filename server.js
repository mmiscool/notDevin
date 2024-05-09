import express from 'express';
import {serverFunctionsCall} from './serverFunctions.js';
const app = express();
const PORT = 3000;

const debugMode = false;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint that handles POST requests
app.post('/api', async (req, res) => {
    //console.log("\n\nAPI CALL RECEIVED",  req.body); // Log the request body to the console
    const responseObject = await serverFunctionsCall(req.body);
    //console.log("responseObject",  responseObject);
    res.status(200).send(JSON.stringify(responseObject));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

