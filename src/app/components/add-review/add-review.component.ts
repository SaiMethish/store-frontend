import { Component, inject, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {  Review } from 'src/app/interfaces/Review';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent {

  @Input() productId:any;
  productService:ProductService=inject(ProductService);
  spinner=inject(NgxSpinnerService);
  toastr=inject(ToastrService);

  constructor(public sharedService:SharedService){}
  userRating:number= 0;
  comments:string; 
  
  setRating(rating: number): void {
    this.userRating = rating;
  }

  
  submitReview(): void {
    let review:Review={
      comment:this.comments,
      rating:this.userRating.toString(),
      reviewerEmail:"",
      reviewerName:""
    }
    this.sharedService.toAdd.next(false);
    this.productService.addReview(review,this.productId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("review added");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        this.spinner.hide();
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error(err.error.message);
        this.spinner.hide();
      }
    })
  }
}