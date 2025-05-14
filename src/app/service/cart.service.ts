import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient, private sharedService:SharedService, private spinner:NgxSpinnerService) { }

  baseUrl=this.sharedService.baseUrl+"/api/cart";

  getCart=()=>{
    this.spinner.show();
    return this.http.get(`${this.baseUrl}/mycart`);
  }

  addToCart=(productId:number, quantity:number)=>{
    this.spinner.show()
    return this.http.post(`${this.baseUrl}/add?productId=${productId}&quantity=${quantity}`,null);
  }

  updateCart=(cartItemId:number,quantity:number)=>{
    this.spinner.show()
    return this.http.put(`${this.baseUrl}/update?cartItemId=${cartItemId}&quantity=${quantity}`,null);
  }

  removeFromCart=(cartItemId:number)=>{
    this.spinner.show()
    return this.http.delete(`${this.baseUrl}/remove?cartItemId=${cartItemId}`);
  }

  clearCart=()=>{
    this.spinner.show();
    return this.http.delete(`${this.baseUrl}/clear`);
  }
}
