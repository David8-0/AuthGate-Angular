export interface User {
    _id?:string;
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
    role?: string;
    age?:number;
    address?: string;
    website?: string;
    oldPassword?:string;
    password?:string;
    confirmPassword?: string;
    deleted?:boolean;
    projects?:any;
    githubId?: string;
    googleId?: string;
    facebookId?: string;
    isFirstTime?:boolean;
}

