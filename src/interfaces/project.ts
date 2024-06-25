export interface Project {
    _id?:string;
    clientID?: string;
    clientSECRET?: string;
    name: string;
    callBackUrl: string;
    createdAt?:Date;
    updatedAt?:Date;
    deleted?:boolean;
}
