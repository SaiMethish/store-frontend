import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8080/api/cart";

  getCart=()=>{
    return this.http.get(`${this.baseUrl}/mycart`);
  }

  addToCart=(productId:number, quantity:number)=>{
    return this.http.post(`${this.baseUrl}/add?productId=${productId}&quantity=${quantity}`,null);
  }
}
