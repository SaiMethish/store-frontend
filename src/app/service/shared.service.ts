import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/Purchase';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //baseUrl="https://ecommerce-d24x.onrender.com";
  baseUrl="http://localhost:8080"

  constructor(private http:HttpClient, private spinner:NgxSpinnerService) { }
  
  userCart=new BehaviorSubject([]);
  $userCart=this.userCart.asObservable();

  spinnerFlag=new BehaviorSubject(false);

  searchText = new BehaviorSubject('');
  categoryFlag=new BehaviorSubject(false);
  categoryName=new BehaviorSubject('');


  toAdd=new BehaviorSubject(false);

  setUserCart=(cart:any)=>{
    this.userCart.next(cart);
  }

  formatToINR(number:number) {
    return number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  }

  checkout=(purchase:Order)=>{
    this.spinner.show();
    return this.http.post(`${this.baseUrl}/api/checkout/purchase`,purchase);
  }

  placeOrder=(total_price:number)=>{
    this.spinner.show();
    return this.http.post(`${this.baseUrl}/payment?amount=${total_price}&currency=INR`,null);
  }

  getOrderList=()=>{
    this.spinner.show();
    return this.http.get(`${this.baseUrl}/api/checkout/getOrders`);
  }

}
