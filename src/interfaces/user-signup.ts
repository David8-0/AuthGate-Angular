export interface UserSignup {
    name:string;
    password:string;
    email:string;
    phone?: string;
    image?: string;
    age?:number;
    confirmPassword:string;
}
