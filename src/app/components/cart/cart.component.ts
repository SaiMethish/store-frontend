import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, public sharedService: SharedService, private toastr: ToastrService,
    public router:Router
  ) { }
  userCart!: any;
  totalPrice = 0;
  @ViewChild('quantity') quantityList!: QueryList<HTMLInputElement>;
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.userCart = res.cartItems;
        this.totalPrice = res.totalPrice;
        console.log(res);
      },
      error: (err: any) => { console.log(err) }
    });
  }
  clearCart() {
    if(!this.userCart.length){
      this.toastr.warning('cart is empty');
      return;
    }
    this.cartService.clearCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("cart cleared");
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  updateCart(e: any, cart: any) {
    const quantity = e.target.value;
    const cartItemId = cart.id;
    if (quantity == 0) {
      this.cartService.removeFromCart(cartItemId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success("cart item removed");
          window.location.reload();
        },
        error: (err: any) => console.log(err)
      })
      return;
    }
    this.cartService.updateCart(cartItemId, quantity).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("cart updated");
        window.location.reload();
      },
      error: (err: any) => console.log(err)
    })
  }

}
