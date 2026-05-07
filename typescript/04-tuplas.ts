const persona: [string, number] = ['John', 30];
const [nombre, edad] = persona;

//1. Coordenadas
const coordenadas: [latitude: number, longitude: number] = [10, 20];
const [x, y] = coordenadas;

//2. RGB
const rgb: [red: number, green: number, blue: number] = [255, 0, 0];
const [r, g, b] = rgb;

//3. Range
const range: [min: number, max: number] = [1, 10];
const [min, max] = range;

//4. userState React
type stateCount = [count: number, setCount: (newVal: number) => void];

// Tuplas con REST
const numeros: [number, ...number[]] = [1, 2, 3, 4, 5];
const [primero, ...resto] = numeros;

