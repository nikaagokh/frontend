export interface Product {
    id:number;
    nameGeo:string;
    nameEng?:string;
    description?:string;
    price:number;
    discount:number;
    sku:string;
    stck:number;
    condition:string;
    views:number;
    updated:string;
    categoryId:number;
    comments:any;
    //
    quantity?:number;
    images?:Array<any>;
    category?:any;

}