interface Person {
    readonly name: string;
    readonly age: number;
}

interface Id {
    id: `user-${number}`;
}

interface User extends Person, Id {
    email?: string;
    role: 'admin' | 'user' | 'moderator';
    saludar: () => string;
    login(): boolean;
}

export type UserType = {
    readonly name: string;
    readonly age: number;
    email?: string;
    role: 'admin' | 'user' | 'moderator';
    saludar: () => string;
    login(): boolean;
}

const user: User = {
    name: 'John',
    age: 30,
    id: 'user-1',
    email: 'john@example.com',
    role: 'admin',
    saludar: () => 'Hello',
    login: () => true
}