import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  userCart=new BehaviorSubject([]);
  $userCart=this.userCart.asObservable();

  setUserCart=(cart:any)=>{
    this.userCart.next(cart);
  }

}
