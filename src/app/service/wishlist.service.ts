import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl=`${this.sharedService.baseUrl}/api/wishlist`;
  constructor(private http:HttpClient, private sharedService:SharedService, private spinner:NgxSpinnerService) { }

  getWishlist=()=>{
    this.spinner.show()
    return this.http.get(`${this.baseUrl}/mywishlist`);
  }

  addItem=(productId:number)=>{
    this.spinner.show();
    return this.http.post(`${this.baseUrl}/add?productId=${productId}`,null);
  }
  
  removeItem=(itemId:number)=>{
    this.spinner.show();
    return this.http.delete(`${this.baseUrl}/remove?itemId=${itemId}`);
  }

  moveToCart=(itemId:number,quantity:number)=>{
    this.spinner.show();
    return this.http.post(`${this.baseUrl}/move-to-cart?wishlistItemId=${itemId}&quantity=${quantity}`,null);
  }

  clearWishlist=()=>{
    this.spinner.show();
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
