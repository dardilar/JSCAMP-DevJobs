import { mkdir, readFile, writeFile } from 'node:fs/promises';

const content = await readFile('./file.txt', 'utf-8');
console.log(content);

const outputDir = 'output/files/documents';
await mkdir(outputDir, { recursive: true });

const upperContent = content.toUpperCase();
await writeFile(`./${outputDir}/fileUppercase.txt`, upperContent);
console.log('Archivo creado con contenido en mayusculas');