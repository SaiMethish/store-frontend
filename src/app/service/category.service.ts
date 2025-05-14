import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient, private sharedService:SharedService,
    private spinner:NgxSpinnerService
  ) { }

  baseUrl=this.sharedService.baseUrl+"/api";

  getAllCategories=()=>{
    this.spinner.show();
    return this.http.get(`${this.baseUrl}/category/getAll`);
  }

  getProductByCategory=(categoryName:string)=>{
    this.spinner.show();
    return this.http.get(`${this.baseUrl}/category/category/${categoryName}`);
  }

}
