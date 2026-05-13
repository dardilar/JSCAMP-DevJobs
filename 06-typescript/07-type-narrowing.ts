const procesar = function(value: number | string) {
    if (typeof value === 'number') {
        // Type narrowing: TypeScript sabe que value es un number
        return value * 2;
    } else {
        // Type narrowing: TypeScript sabe que value es un string
        return value.length;
    }
}

const printMessage = function(message: string | null | undefined) {
    if(message) {
        console.log(message);
    } else {
        console.log('No message');
    }
}

// Operator Narrowing

type Pez = {
    nadar: () => void;
    nombre: string;
}

type Ave = {
    volar: () => void;
    nombre: string;
}

type Animal = Pez | Ave;

const moveAnimal = function(animal: Animal) {
    if('nadar' in animal) {
        animal.nadar();
    } else {
        animal.volar();
    }
}

