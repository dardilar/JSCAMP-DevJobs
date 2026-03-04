import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

let content;
if(process.permission.has('fs.read', 'file.txt')) {
    content = await readFile('file.txt', 'utf-8');
    console.log(content);
} else {
    console.log('No tienes permiso para leer el archivo');
}

if(process.permission.has('fs.write', 'output/files/documents')) {
    const outputDir = join('output', 'files', 'documents');
    await mkdir(outputDir, { recursive: true });

    const upperContent = content.toUpperCase();
    const outputFilePath = join(outputDir, 'fileUppercase.txt');

    const baseName = basename(outputFilePath);
    const extension = extname(outputFilePath);

    console.log(`El nombre base es: ${baseName}`);
    console.log(`La extension es: ${extension}`);

    await writeFile(outputFilePath, upperContent);
    console.log('Archivo creado con contenido en mayusculas');
} else {
    console.log('No tienes permiso para escribir el archivo');
}