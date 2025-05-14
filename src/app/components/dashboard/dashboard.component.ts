import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService, private cartService: CartService,
    private spinner:NgxSpinnerService
  ) { }
  ngOnInit(): void {
    //this.productService.populateData();
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.sharedService.setUserCart(res.cartItems);
      },
      error: (err: any) => {
        console.error(err);
      },
      //complete:()=>this.spinner.hide()
    })
  }

  

}
