import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  constructor(public sharedService:SharedService, private spinner:NgxSpinnerService){}
  orderList:any=[];

  ngOnInit(): void {
    this.sharedService.getOrderList().subscribe({
      next:(res:any)=>{
        this.orderList=res;
        this.orderList.forEach((i:any)=>{
          i.dateCreated=new Date(i?.dateCreated).toDateString();
        })
      },
      error:(err:any)=>console.error(err),
      complete:()=>this.spinner.hide()
    })
  }
}
  