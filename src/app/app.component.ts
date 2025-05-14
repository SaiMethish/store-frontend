import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from './service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  flag=false;
  constructor(private modalService: NgbModal, private spinner:NgxSpinnerService,
    private sharedService:SharedService
  ) {
  }
  ngOnInit(): void {
    // this.sharedService.spinnerFlag.subscribe((res:any)=>{
    //   this.flag=res;
    //   console.log(this.flag)
    //   if(res==true) this.spinner.show();
    // })
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}