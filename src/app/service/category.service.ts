import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8080/api/category";

  getAllCategories=()=>{
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  getProductByCategory=(categoryName:string)=>{
    return this.http.get(`${this.baseUrl}/category/${categoryName}`);
  }

}
