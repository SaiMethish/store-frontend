import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  template: `
  <div class="card">
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

  @Input() category: any;

}
