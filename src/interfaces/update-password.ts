export interface UpdatePassword {
    oldPassword?:string;
    newPassword:string;
    confirmNewPassword:string;
    token?:string;
}
