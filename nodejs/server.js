import { createServer } from 'node:http';

// Read automatically .env and add variables to process.env
process.loadEnvFile();

const port = process.env.PORT ?? 3000;

const server = createServer((req, res) => {
    console.log('Received request:', req.method, req.url);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello World from Node.js 💡🦾');
});

server.listen(port, () => {
    const address = server.address();
    console.log(`Server running on port http://localhost:${address.port}`);
});