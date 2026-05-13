// Sintaxis 1
const numeros: number[] = [1, 2, 3, 4, 5];
const colores: [string, string, string] = ["rojo", "verde", "azul"];
const activo: boolean[] = [true, false, true];

// Sintaxis 2
const numeros2: Array<number> = [1, 2, 3, 4, 5];
const colores2: Array<string> = ["rojo", "verde", "azul"];
const activo2: Array<boolean> = [true, false, true];

const vacio: string[] = [];

// Arrays de tipos mixtos
const mixto: (string | number)[] = ["hola", 1, "mundo", 2];
const mixto2: Array<string | number> = ["hola", 1, "mundo", 2];