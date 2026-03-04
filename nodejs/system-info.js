import os from 'node:os';
import ms from 'ms';

console.log('Informacion del sistema');
console.log(`Tipo de sistema: ${os.platform()}`);
console.log(`Version del sistema: ${os.release()}`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`CPUs: ${os.cpus().length}`);
console.log(`Memoria total: ${os.totalmem() / 1024 / 1024} MB`);
console.log(`Memoria disponible: ${os.freemem() / 1024 / 1024} MB`);
console.log(`Tiempo de actividad: ${ms(os.uptime() * 1000, {long: true})}`);
console.log(`Directorio del usuario: ${os.homedir()}`);
