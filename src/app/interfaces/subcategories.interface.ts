export type Submenu = {
    id?:number;
    image?:string;
    name?:string;
    cyear?:Subcategory[]
}

export type Subcategory = {
    id?:number;
    imageUrl?:string;
    range?:string;
}