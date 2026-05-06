export type Company = {
    name: string;
    position: string;
    phone?: string;
    team: string[];
}

type UserId = {
    readonly id: string | number;
};

export type User = {
    readonly name: string;
    readonly age: number;
    email?: string;
    company?: Company;
    role: 'admin' | 'user' | 'moderator';
}

type UserBirthday = {
    birthday: Date;
}

export type UserEntity = User & UserId & UserBirthday; // Debe tener todos los campos de User, UserId y UserBirthday


