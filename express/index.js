import express from 'express';

const PORT = process.env.PORT ?? 1234;
const app = express();

app.get('/', (request, response) => {
    return response.send('Hello World!');
});

app.get('/health', (request, response) => {
    return response.json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});