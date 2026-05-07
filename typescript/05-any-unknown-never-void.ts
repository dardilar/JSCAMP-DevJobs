// ANY - El tipo que desactiva la comprobación de tipos
let cualquierCosa: any = 42;
cualquierCosa = "Ahora es una cadena";
cualquierCosa = { nuevo: "objeto" };

const result = cualquierCosa + 'Hola'

//1. En migraciones de JavaScript a TypeScript
let data: any = JSON.parse('{"name": "John", "age": 30}');
console.log(data.name); // Sin any, TypeScript no sabría el tipo de data
//2. Librerias de terceros


// UNKNOWN - Tipo seguro para ANY
let valorDesconocido: unknown = 42;
valorDesconocido = "cadena";
valorDesconocido = { nuevo: "objeto" };

// TypeScript requiere verificación de tipo antes de usar 'valorDesconocido'
if (typeof valorDesconocido === 'string') {
  console.log(valorDesconocido.toUpperCase()); // Ahora TypeScript sabe que es una cadena
}

// NEVER - Tipo que nunca ocurre
function error(mensaje: string): never {
  throw new Error(mensaje);
}

// VOID - Ausencia de tipo de retorno
function logMensaje(mensaje: string): void {
  console.log(mensaje);
  // No devuelve nada
}