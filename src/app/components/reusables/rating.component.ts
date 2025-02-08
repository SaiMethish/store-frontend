import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `

    <div class="row">
    <p class="pi pi-star-fill col-auto" [ngClass]="{'fill':tmpArray[0]}"></p>
    <p class="pi pi-star-fill col-auto" [ngClass]="{'fill':tmpArray[1]}"></p>
    <p class="pi pi-star-fill col-auto" [ngClass]="{'fill':tmpArray[2]}"></p>
    <p class="pi pi-star-fill col-auto" [ngClass]="{'fill':tmpArray[3]}"></p>
    <p class="pi pi-star-fill col-auto" [ngClass]="{'fill':tmpArray[4]}"></p>
    <p class="col-auto"> ( {{reviews.length}} ) </p>
    </div>
  
  `,
  styles: [`
  .row{
    width:100%;
    align-items:center;
  }
  .fill{
    color:#FFAD33;
  }
  p{
    color:gray;
  }
    `]
})
export class RatingComponent implements OnInit {
  tmpArray!: any[];

  ngOnInit() {
    this.tmpArray = new Array(5);
    let sum = this.reviews.reduce((sum: number, i: any) => {
      return sum + Number(i.rating);
    }, 0);
    let avg = sum / this.reviews.length;
    for (let i = 0; i < avg; i++) {
      this.tmpArray[i] = 1;
    }
  }

  @Input() reviews: any;



}
