import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/Purchase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  userCart=new BehaviorSubject([]);
  $userCart=this.userCart.asObservable();

  searchText = new BehaviorSubject('');
  categoryFlag=new BehaviorSubject(false);
  categoryName=new BehaviorSubject('');

  setUserCart=(cart:any)=>{
    this.userCart.next(cart);
  }

  formatToINR(number:number) {
    return number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  }

  checkout=(purchase:Order)=>{
    return this.http.post(`http://localhost:8080/api/checkout/purchase`,purchase);
  }

  placeOrder=(total_price:number)=>{
    return this.http.post(`http://localhost:8080/payment?amount=${total_price}&currency=INR`,null);
  }

  getOrderList=()=>{
    return this.http.get(`http://localhost:8080/api/checkout/getOrders`);
  }

}
