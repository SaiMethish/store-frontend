import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `

  <div class="row" *ngFor="let i of itemsArray">
    <p class="col-4">{{i}}</p>
</div>
  <div class="row align-items-center">
    <p class="pi pi-angle-left col-auto"></p>
    <ng-container *ngFor="let val of pageArray;let i=index" >
      <p class="col-auto">{{i+1}}</p>
    </ng-container>
    <p class="pi pi-angle-right col-auto"></p>
  </div>
  `,
  styles: [``]
})
export class PaginatorComponent implements OnInit {

  ngOnInit(): void {
    this.itemsArray=new Array();
    this.pageArray=new Array(this.pagesCount);
    for(let i=0;i<20;i++){
      this.itemsArray.push('item'+i);
    }
  }
  itemsArray!:any[];
  total:number=20;
  itemsPerPage=4;
  pagesCount=this.total/this.itemsPerPage;
  pageArray!:any[];



}
