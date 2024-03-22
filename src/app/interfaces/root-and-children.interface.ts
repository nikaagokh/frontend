import { Category } from "./root-categories.interface";

export interface RootAndChildren {
    id?:number;
    image?:string;
    name?:string;
    subcategories?:Category[]
}