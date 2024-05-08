import http from 'http';
import { parse } from 'url';
import { readFile, stat } from 'fs/promises';
import { join, resolve, extname } from 'path';

const publicDirectory = resolve('public');

export const server = http.createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('Request path:', trimmedPath);
    if (trimmedPath === '') trimmedPath = 'index.html';
    // Check if the request path has a file extension
    if (extname(trimmedPath)) {
        console.log('File request:', trimmedPath);
        console.log(extname(trimmedPath));
        const filePath = join(publicDirectory, trimmedPath);

        try {
            const fileStats = await stat(filePath);
            if (fileStats.isFile()) {
                const data = await readFile(filePath);
                res.writeHead(200);
                res.end(data);
                return;
            }
        } catch (error) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
    }

    // Handle JSON API requests
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body).toString();
        let responseContent;
        let statusCode = 200;

        switch (trimmedPath) {
            case 'endpoint1':
                responseContent = { message: 'This is endpoint 1' };
                break;
            case 'endpoint2':
                responseContent = { message: 'This is endpoint 2' };
                break;
            default:
                statusCode = 404;
                responseContent = { error: 'Endpoint not found' };
                break;
        }

        try {
            const requestData = JSON.parse(body);
            responseContent.requestData = requestData;
        } catch (e) {
            if (body) {
                responseContent.requestData = 'Invalid or no JSON data provided';
            }
        }

        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseContent));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
