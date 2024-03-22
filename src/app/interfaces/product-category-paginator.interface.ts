import { LinksPaginator } from "./links-paginator.interface";
import { MetaPaginator } from "./meta-paginator.interface";
import { Product } from "./product.interface";

export interface ProductCategory {
    items:Product[];
    meta:MetaPaginator;
    links:LinksPaginator;
}