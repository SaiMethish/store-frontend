import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';
import { Customer,Order,OrderItem,Address } from 'src/app/interfaces/Purchase';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var Razorpay:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(public sharedService:SharedService, private cartService:CartService,
    private fb:FormBuilder, private toastr:ToastrService, private http:HttpClient,
  private router:Router, private spinner:NgxSpinnerService){}
  cart!:any[];
  billingForm!:FormGroup;
  totalPrice!:number;
  totalQuantity:number;
  ngOnInit() {
    this.billingForm=this.fb.group({
      firstName:[""],
      lastName:[""],
      email:[""],
      street:[""],
      city:[""],
      state:[""],
      country:[""],
      zipCode:[""],
      payment:[""]
    });

    this.cartService.getCart().subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.cart=res.cartItems;
        this.totalPrice=res.totalPrice;
        this.totalQuantity=this.cart.reduce((total,i)=>{
          return total+=i.quantity;
        },0)
      },
      (err:any)=>{
        this.spinner.hide();
        console.error(err);
      },
    )
  }

  placeOrder=()=>{
    let paymentMode=this.billingForm.get('payment')?.value;
    if(paymentMode==="Online"){
      this.sharedService.placeOrder(Math.floor(this.totalPrice)).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.openModel(res);
        },
        error:(err:any)=>{console.log(err)},
        complete:()=>this.spinner.hide()
      })
    }
   else this.checkout("COD");

  }


  checkout=(paymentMode:string)=>{
    let {firstName,lastName,email,street,city,state,country,zipCode}=this.billingForm.value;
    let customer:Customer=new Customer(firstName,lastName,email);
    let shippingAddress:Address=new Address(street,city,state,country,zipCode);
    let billingAddress:Address=new Address(street,city,state,country,zipCode);
    let obj={
      totalPrice:this.totalPrice,
      totalQuantity:this.totalQuantity,
      status:paymentMode
    };
    let orderItems:OrderItem[]=this.cart.map((i:any)=>{
      return new OrderItem(i.productName,i.quantity,i.unitPrice,i.imageUrl)
    });
    let order:Order=new Order(customer,shippingAddress,billingAddress,obj,orderItems);
    this.sharedService.checkout(order).subscribe({
      next:(res:any)=>{
        this.toastr.success("order id"+res.orderTrackingNumber);
        setTimeout(() => {
          this.router.navigate(['/myorder'])
        }, 1500);
      },
      error:(err:any) =>{
        console.error(err);
      },
      complete:()=>this.spinner.hide()
    })
  }

  openModel = (order: any) => {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: order.amount,
      name: 'Someone',
      key: 'rzp_test_OZLnk4hdoYtECl',
      // prefill: {
      //   name: 'sai kumar',
      //   email: 'sai@gmail.com',
      //   phone: '9898989898'
      // },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      },
      handler:(res:any)=>{
        setTimeout(() => {
          this.checkout("Online");
        }, 1000);
      }
    }
    Razorpay.open(RozarpayOptions)
};

}
