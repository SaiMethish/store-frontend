import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService, private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.sharedService.setUserCart(res.cartItems);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
