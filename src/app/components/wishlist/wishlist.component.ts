import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
   
  myWishlist!:[]
  constructor(private wishlistService:WishlistService, private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ){}

  ngOnInit(){
    this.wishlistService.getWishlist().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.myWishlist=res.items;
      },
      error:(err:any)=>{ console.error(err)},
      complete:()=>this.spinner.hide()
    })
  }

  clear=()=>{
    this.wishlistService.clearWishlist().subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message);
        setTimeout(()=>{
          window.location.reload();
        },2000)
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message);
      },
      complete:()=>this.spinner.hide()
    })
  }

}
