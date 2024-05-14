import express from 'express';
import {serverFunctionsCall} from './serverFunctions.js';
import { networkInterfaces } from 'os';
import "./llmCalls.js"
const app = express();
const PORT = 3000;

const debugMode = false;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint that handles POST requests
app.post('/api', async (req, res) => {
    //console.log("API CALL RECEIVED!!",  req.body); // Log the request body to the console
    //console.log("\n\nAPI CALL RECEIVED",  req.body); // Log the request body to the console
    const responseObject = await serverFunctionsCall(req.body);
    //console.log("responseObject",  responseObject);
    res.status(200).send(JSON.stringify(responseObject));
    
});





// Modify this line to bind the server to all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Accessible on your network at http://${getNetworkIp()}:${PORT}`);
});

// Helper function to get the network IP of the server
function getNetworkIp() {
    
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '0.0.0.0';
}
