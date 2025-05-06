import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { SharedService } from 'src/app/service/shared.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist-item',
  template: `
  <div class="wishlist-item">
    <div class="image-div">
      <img [src]="wishlistItem.imageUrl" [alt]="wishlistItem.productName">
    </div>
    <button class="btn btn-dark btn-block" (click)="moveItem(wishlistItem.id)">Add To Cart</button>
    <div class="details">
      <p class="item-name">{{wishlistItem.productName}}</p>
      <p class="item-price">{{this.sharedService.formatToINR(wishlistItem.unitPrice)}}</p>
    </div>
    <button class="delete-btn">
      <i class="pi pi-trash"(click)="deleteItem(wishlistItem.id)"></i>
    </button>
  </div>
  `,
  styles: [`
    .wishlist-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: #fff;
      padding: 10px;
    }

    .image-div {
      width: 100%;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f9f9f9;
    }

    .image-div img {
      max-width: 80%;
      max-height: 40%;
      object-fit: cover;
    }

    .btn-block {
      width: 100%;
      padding: 10px 0;
      font-family: "Poppins";
      font-size: 14px;
      font-weight: bold;
      background-color: #000;
      color: #fff;
      border: none;
      cursor: pointer;
      text-align: center;
      margin: 5px 0;
    }

    .btn-block:hover {
      background-color: #333;
    }

    .details {
      text-align: center;
    }

    .item-name {
      font-size: 1em;
      font-weight: bold;
      margin: 5px 0;
      text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
    }

    .item-price {
      font-size: 1em;
      color: #e63946;
      margin: 0;
    }

    .delete-btn {
      position: absolute;
      top: 5%;
      right: 5%;
      background-color: #fff;
      border: none;
      border-radius: 50%;
      padding: 2%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .delete-btn i {
      font-size: 1em;
      color: #000;
    }

    .delete-btn:hover i {
      color: #e63946;
    }
  `]
})
export class WishlistItemComponent {
  @Input() wishlistItem: any;

  constructor(public sharedService: SharedService, private cartService: CartService,
    private wishlistService: WishlistService, private toastr: ToastrService,
    private router: Router
  ) { }

  deleteItem = (itemId: number) => {
    this.wishlistService.removeItem(itemId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (err: any) => {
        console.log(err.error);
        this.toastr.error(err.error.message);
      }
    })
  }
  moveItem = (itemId: number) => {
    this.wishlistService.moveToCart(itemId, 1).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.router.navigate(['mycart']);
        }, 1500)
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    })
  }
}