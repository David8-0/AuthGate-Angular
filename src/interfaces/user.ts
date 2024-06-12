export interface User {
    id:string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: Role;
}

enum Role{
    tenant,
    user
}