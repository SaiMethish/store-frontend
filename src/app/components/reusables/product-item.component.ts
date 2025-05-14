import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-product-item',
  template: `
  <div class="card">
    <div class="card-image">
      <div  class=" wishlist-icon position-absolute"><p [ngClass]="{'pi-heart-fill wishlist-red':toggle,'pi-heart':!toggle}"  class="pi " (click)="addToWishList(product.id)"></p></div>
      <div  class=" view-icon position-absolute"><p class="pi pi-eye " [routerLink]="['product',product.id]"  ></p></div>
    <img [src]="product.imageUrl" class="card-img-top" >
    </div>
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <p style="color: #DB4444;">{{this.sharedService.formatToINR(product.unitPrice)}}</p>
    <app-rating [reviews]="product.reviews"></app-rating>
  </div>
  </div>
  `,
  styles: [
    `
    .card{
      .card-title{
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
      }
      .card-image{
        .wishlist-icon,.view-icon{
          background-color:white;
          width:15%;
          height:20%;
          left:83%;
          top:10%;
          align-items:end;
          display:flex;
          justify-content:center;
          border-radius:50%;
          cursor:pointer;
          *{
            position:absolute;
            top:23%;
            font-size:1.2rem;
          }
        }
        .view-icon{
          top:32%;
        }
        position:relative;
        img{
        aspect-ratio:3/2;
        object-fit:contain;
        background-color:#f5f5f5;
      }
      }
      
      }
      .wishlist-red{
        color:red;
      }
    `
  ]
})
export class ProductItemComponent {
  

  avgRating!: number;

  @Input() product: any;

  
  toggle:boolean=false;

  constructor(public sharedService:SharedService, private wishlistService:WishlistService,
    private toastr:ToastrService,private router:Router, private spinner:NgxSpinnerService
  ){}



addToWishList(productId:number){
  this.toggle=!this.toggle;
  this.wishlistService.addItem(productId).subscribe({
    next:(res:any)=>{
      this.toastr.success(res.message);
      setTimeout(() => {
        this.router.navigate(['wishlist'])
      }, 1500);
    },
    error:(err:any)=>{
      this.toastr.error(err.error.message);
    },
    complete:()=>this.spinner.hide()
  })
}

}
