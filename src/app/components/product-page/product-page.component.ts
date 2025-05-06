import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit,AfterViewInit {
  constructor(private route:ActivatedRoute, private sharedService:SharedService,
    private renderer:Renderer2, private cartService:CartService, private toastr:ToastrService,
  private wishlistService:WishlistService){}
  product:any;
  @ViewChild('productStatus') productStatus!:ElementRef;

  ngOnInit(){
    this.route.data.subscribe((i:any)=>{
      this.product=i.product;
    })    
  }
  ngAfterViewInit(): void {
      let pText:string=this.productStatus.nativeElement.innerText;
      if(pText=='Low On Stock'){
        this.renderer.setStyle(this.productStatus.nativeElement,'color','orange');
      }
      else if(pText=='In Stock'){
        this.renderer.setStyle(this.productStatus.nativeElement,'color','#00FF66');
      }
      else this.renderer.setStyle(this.productStatus.nativeElement,'color','red');
  }

  getStatus(val:number){
    if(val==1) return "Low On Stock";
    if(val==2) return "In Stock";
    return "Out Of Stock";
  }

  formatToINR(number:number) {
    return number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  }

  addToCart(){
    this.cartService.addToCart(this.product.id,1).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success(res.message,'success');
        this.cartService.getCart().subscribe({
          next:(res:any)=>{
            this.sharedService.setUserCart(res.cartItems);
          },
          error:(err:any)=>{
            console.error(err);
          }
        })
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }

  addToWishlist(productId:number){
    this.wishlistService.addItem(productId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success(res.message);
      },
      error:(err:any)=>{
        console.error(err);
        this.toastr.error(err.message);
      }
    })
  }

}
