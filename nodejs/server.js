import { createServer } from 'node:http';

// Read automatically .env and add variables to process.env
process.loadEnvFile();

const port = process.env.PORT ?? 3000;

const sendJson = function(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
    const { url, method } = req;

    if(method !== 'GET') {
        return sendJson(res, 405, { error: 'Method not allowed' });
    }

    if(url === '/users') {
        return sendJson(res, 200, [
            { id: 1, name: 'Duvan Ardila' },
            { id: 2, name: 'Midudev' },
            { id: 3, name: 'Ana María' }
        ]);
    }

    if(url === '/health') {
        return sendJson(res, 200, { status: 'OK', uptime: process.uptime() });
    }

    return sendJson(res, 404, { error: 'Page not found' });
});

server.listen(port, () => {
    const address = server.address();
    console.log(`Server running on port http://localhost:${address.port}`);
});