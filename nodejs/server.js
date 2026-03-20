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
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  },
  {
    "name": "midu",
    "id": "c2c5b26c-0b51-4d0d-a085-987da276c9cb"
  },
  {
    "name": "pheralb",
    "id": "24d9a10e-6baa-4c60-b291-354ecebc97eb"
  },
  {
    "name": "madeval",
    "id": "580f4bb9-b311-4f06-8e09-e88605dd9038"
  },
  {
    "name": "Lucía",
    "id": "ff3b043e-5b5b-49d5-95a0-2a3c04922220"
  }
]

const server = createServer(async (req, res) => {
    const { url, method } = req;

    const [pathname, queryString] = url.split('?');
    
    const searchParams = new URLSearchParams(queryString);
    

    if(method === 'GET') {
        if(pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length;
            const offset = Number(searchParams.get('offset')) || 0;

            const paginatedUsers = users.slice(offset, offset + limit);

            return sendJson(res, 200, paginatedUsers);
        }
    
        if(pathname === '/health') {
            return sendJson(res, 200, { status: 'OK', uptime: process.uptime() });
        }
    };

    if(method === 'POST') {
        if(pathname === '/users') {
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