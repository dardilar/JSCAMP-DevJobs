import type { User, UserEntity } from "./00-types";

// type User = {
//     name: string;
//     age: number;
// }

const user: User = {
    name: "John",
    age: 30,
    email: "john@example.com",
    company: {
        name: "Google",
        position: "Developer",
        phone: "123456789",
        team: ["John", "Jane"]
    },
    role: "admin"
};

// user.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.

const anotherUser: User = {
    name: "Jane",
    age: 25,
    role: "user"
};

const userEntity: UserEntity = {
    id: 1,
    name: 'John',
    age: 30,
    email: 'john@example.com',
    company: {
        name: 'Google',
        position: 'Developer',
        phone: '123456789',
        team: ['John', 'Jane']
    },
    role: 'admin',
    birthday: new Date('1990-01-01')
};

type Dictionary = {
    [key: string]: string;
}

const dictionary: Dictionary = {
    apple: 'manzana',
    banana: 'banana',
    orange: 'naranja',
    grape: 'uva'
};
