import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl="http://localhost:8080/api/wishlist";
  constructor(private http:HttpClient) { }

  getWishlist=()=>{
    return this.http.get(`${this.baseUrl}/mywishlist`);
  }

  addItem=(productId:number)=>{
    return this.http.post(`${this.baseUrl}/add?productId=${productId}`,null);
  }
  
  removeItem=(itemId:number)=>{
    return this.http.delete(`${this.baseUrl}/remove?itemId=${itemId}`);
  }

  moveToCart=(itemId:number,quantity:number)=>{
    return this.http.post(`${this.baseUrl}/move-to-cart?wishlistItemId=${itemId}&quantity=${quantity}`,null);
  }

  clearWishlist=()=>{
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
