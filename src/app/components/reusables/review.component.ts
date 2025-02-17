import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  template: `
  <div  style="width: 100%;  height:35vh; ">
    <h6 id="title">Ratings & Reviews</h6>
    <div class="ratings flex flex-row w-full">
      <div class="rating-star flex rounded-pill text-white p-2 h-1">
        <p>3.3</p>
        <p class="bi bi-star-fill"></p>
      </div>
      <p id="text">{{reviews.length}} ratings and {{reviews.length}} reviews</p>
      <button class="btn btn-primary">Rate Product</button>
    </div>
    <p style="font-family: 'Inter';font-size:1.1rem; font-weight:bold;">Customer Reviews:</p>
    <div id="review-section" style="height: 14vh; width:100%">
    <ng-container *ngFor="let i of reviews" >
        <div class="flex flex-row  w-full" style="gap:3%">
          <div class="small-ratings rounded-pill text-white" style="background-color:#26A541;">
          <p class="col-auto" style="font-family: 'Poppins';font-size:1rem;">{{i.rating}}</p>
          <p class="pi pi-star-fill col-auto" style="margin-bottom: 4%;"></p>
          </div>
        <p style="font-family: 'Poppins'; font-size:0.9rem;margin-top:0.6%;">{{i.comment}}</p>
      </div>
      <div class="flex flex-row w-full" style="column-gap: 60%; color:gray; padding:1% 0 1% 0; border-bottom:1px solid lightgrey; margin-bottom:2%;">
  <p class="col-auto" style="font-family: 'Poppins'; font-size:0.9rem">{{i.reviewerName}}</p>
  <div class="flex flex-row col-auto" style="margin-left:auto; align-items-center;">
    <p class="bi bi-hand-thumbs-up-fill"></p>
    <p class="bi bi-hand-thumbs-down-fill ml-3 mr-1"></p>
  </div>
</div>

    </ng-container>
    </div>
    </div>
  `,
  styles: [`
  #title{
    font-family:"Inter";
    font-weight:bold;
    font-size:1.5rem;
  }
  #review-section::-webkit-scrollbar {
    display: none; /* WebKit browsers */
}
.small-ratings{
  display:flex;
  width:10%;
  height:4vh;
  align-items:center;
  justify-content:center;
  gap:3%;
  *{
    margin:2%;
    padding:2%;
  }
}
  // .rating-star{
  //   width:13%;
  //   background-color:#26A541;
  //   color:white;
  //   font-size:1em;
  //   font-weight:bold;
  //   font-family:"Inter";
  //   height:30px;
  //   padding:2%;
  //   justify-content:center;
  //   gap:2%;
  //   align-items:center;
  // }
  .rating-star{
    align-items:center;
    background-color:#26A541;
    width:17%;
    font-size:1.3rem;
    font-weight:bold;
    font-family:"Inter";
    height:5vh;
    gap:5%;
    :first-child{
      margin-left:5%;
    }
    *{
      padding:1%;
      margin:1%;  
    }
  }
  .ratings{
    padding:0 0 2% 0;
    //height:5vh;
    gap:3%;
    wdith:100%;
    align-items:center;
    button{
      padding-top:2%;
      padding-bottom:2%;
      padding-right:3%;
      padding-left:3%;
      margin:1%;
      font-family:"Poppins";
      font-size:0.97rem;
      font-weight:bold;
      text-align:center;
    }
    #text{
      margin-top:3%;
      font-family:"Poppins";
      font-size:1.3rem;
    }
  }
  
    `]
})
export class ReviewComponent {

  @Input() reviews: any;

}
