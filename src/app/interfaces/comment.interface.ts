import { User } from "./user.interface";

export interface Comment {
    id:number;
    comment:string;
    likes:number;
    unlikes:number;
    user:User;
}