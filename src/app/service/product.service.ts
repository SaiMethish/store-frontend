import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/products";

  getAllProducts = () => {
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + sessionStorage.getItem("access-token")
    });
    return this.http.get(`${this.baseUrl}/get`);
  }

  checkStock=(val:string):boolean=>{
    if(val=="Low Stock" || val=="In Stock") return true;
    return false;
  }

  populateData = () => {
    this.http.get("https://dummyjson.com/products?limit=300").subscribe({
      next: (res: any) => {
        console.log(res);
        let data = res.products;
        let updatedData: Product[] = [];
        data.forEach((i: any) => {
          let product: Product;
          product = {
            imageUrl: i.images[0],
            name: i.title,
            unitPrice: i.price * 75,
            unitsIntStock: i.stock,
            isActive: this.checkStock(i.availabilityStatus),
            category: i.category,
            sku: i.sku,
            description: i.description,
            reviews:i.reviews
          }
          updatedData.push(product);
        });
        console.log(updatedData);
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem("access-token")}`
        });
        this.http.post(this.baseUrl + "/populate", updatedData, { headers: headers }).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    });
  }
}
