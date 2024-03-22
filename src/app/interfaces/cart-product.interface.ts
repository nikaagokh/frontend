import { Product } from "./product.interface";

export interface CartProduct {
    products?:Product[];
    total?:number;
    discount?:number;
}