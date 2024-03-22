import { Product } from "./product.interface";

export interface TagProduct {
    id:number;
    name:string;
    category?:number;
    product:Product[];
}