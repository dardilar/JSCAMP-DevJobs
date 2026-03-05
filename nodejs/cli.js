import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

//1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.';

//2. Formateo simple de los archivos
const formatBytes = function(bytes) {
    if(bytes < 1024) return bytes + ' Bytes';
    if(bytes < 1024 * 1024) return bytes / 1024 + 'KB';
    if(bytes < 1024 * 1024 * 1024) return bytes / 1024 / 1024 + 'MB';
    return bytes / 1024 / 1024 / 1024 + 'GB';
}

//3. Leer los nombres, sin info
const files = await readdir(dir);

//4. Recuperar la info de cada archivo
const entries = await Promise.all(
    files.map(async(name) => {
        const fullPath = join(dir, name);
        const info = await stat(fullPath);

        return {
            name,
            size: formatBytes(info.size),
            isDirectory: info.isDirectory()
        }
    })
)

entries.forEach(entry => {
    // Renderizar la información
    const icon = entry.isDirectory ? '📁' : '📄';
    const size = entry.isDirectory ? '-' : `${entry.size}`;
    console.log(`${icon} ${entry.name.padEnd(20)} ${size}`);
});