import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from 'node:stream/consumers';

// Read automatically .env and add variables to process.env
process.loadEnvFile();

const port = process.env.PORT ?? 3000;

const sendJson = function(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
}

const users = [
    { id: 1, name: 'Duvan Ardila' },
    { id: 2, name: 'Midudev' },
    { id: 3, name: 'Ana María' }
];

const server = createServer(async (req, res) => {
    const { url, method } = req;

    if(method === 'GET') {
        if(url === '/users') {
            return sendJson(res, 200, users);
        }
    
        if(url === '/health') {
            return sendJson(res, 200, { status: 'OK', uptime: process.uptime() });
        }
    };

    if(method === 'POST') {
        if(url === '/users') {
            const body = await json(req);
            
            if(!body || !body.name) {
                return sendJson(res, 400, { error: 'Name is required' });
            }

            const newUser = {
                id: randomUUID(),
                name: body.name
            };
            
            users.push(newUser);
            
            return sendJson(res, 201, newUser);
        }
    }

    return sendJson(res, 404, { error: 'Page not found' });
});

server.listen(port, () => {
    const address = server.address();
    console.log(`Server running on port http://localhost:${address.port}`);
});