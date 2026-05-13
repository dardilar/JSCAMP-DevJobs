const sumar = function(a: number, b: number): number {
    return a + b;
}

// Parametros opcionales
const multiplicar = function(a: number, b?: number): number {
    return a * (b || 1);
}

// Parametros por defecto
const dividir = function(a: number, b: number = 1): number {
    return a / b;
}

// REST PARAMETERS
const sumarVarios = function(...numeros: number[]): number {
    return numeros.reduce((a, b) => a + b, 0);
}

console.log(sumarVarios(1, 2, 3, 4, 5)); // 15

// Tipo de Funcion
type OperacionMatematica = (a: number, b: number) => number;

const suma: OperacionMatematica = (a, b) => a + b;
const resta: OperacionMatematica = (a, b) => a - b;
const multiplicacion: OperacionMatematica = (a, b) => a * b;
const division: OperacionMatematica = (a, b) => a / b;