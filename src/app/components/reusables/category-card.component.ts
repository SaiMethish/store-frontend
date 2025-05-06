import { Component, inject, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-category-card',
  template: `
  <div class="card" (click)="categoryClick(category.categoryName)">
    <img [src]="category.imageUrl" class="card-img-top">
    <div class="card-body">
      <h6 class="card-title">{{category.categoryName}}</h6>
    </div>
  </div>
  `,
  styles: [
    `
    .card{
      //background-color:pink;
      width:100%;
      height:100%;
      text-align:center;
      cursor:pointer;
      border:none;
      z-index:0;
      align-items:center;
      transition: width 0.5s ease-in-out, height 0.5s ease-in-out;
      img{
        width:80%;
        max-height:82%;
        height:80%;
        max-height:82%;
      }
      .card-body{
        h5{
          font-family:"Poppins";
        }
      }
    }
    `
  ]
})
export class CategoryCardComponent {
  constructor(private sharedService:SharedService){

  }
  categoryClick=(categoryName:string)=>{
    this.sharedService.categoryFlag.next(true);
    this.sharedService.categoryName.next(categoryName);
  }

  @Input() category: any;

}
