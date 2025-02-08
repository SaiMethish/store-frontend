import { Review } from "./Review";

export interface Product{
    sku:string,
    name:string,
    description:string,
    unitPrice:number,
    imageUrl:string,
    isActive:boolean,
    unitsIntStock:number,
    category:string,
    reviews:Review[]
}