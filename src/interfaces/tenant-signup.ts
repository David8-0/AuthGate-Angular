export interface TenantSignup {
    name:string;
    password:string;
    email:string;
    phone?: string;
    image?: string;
    address?:string;
    website?:string;
    confirmPassword:string;
}
