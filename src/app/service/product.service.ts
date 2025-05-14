import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { SharedService } from './shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Review } from '../interfaces/Review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private sharedService:SharedService, private spinner:NgxSpinnerService) { }

  baseUrl =`${this.sharedService.baseUrl}/api/products`;
  categoryMap=new Map<string,string[]>();
  categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ];
  setCategories=()=>{
    this.categoryMap.set("fashion",[]);
    this.categoryMap.set("furniture",[]);
    this.categoryMap.set("beauty",[]);
    this.categoryMap.set("electronics",[]);
    this.categoryMap.set("groceries",[]);
    this.categoryMap.set("home appliances",[]);
    for(let i of this.categories){
      if(i=="beauty"||i=="furniture"||i=="groceries") this.categoryMap.get(i)?.push(i);
      else if(i.includes("womens")||i.includes("mens")||i.includes("tops")||i.includes("sports")
      || (i.includes("sunglasses"))){
    this.categoryMap.get("fashion")?.push(i);
      }
      else if(i.includes("laptops")||i.includes("watches")||i.includes("smartphones")||i.includes("tablets")||i.includes("motorcycle")||i.includes("vehicle")||i.includes("mobile")){
        this.categoryMap.get("electronics")?.push(i);
      }
      else if(i.includes("kitchen")||i.includes("home")) this.categoryMap.get("home applicances")?.push(i);
      else if(i.includes("skin-care")||i.includes("fragrances")) this.categoryMap.get("beauty")?.push(i);
    }
    return this.categoryMap;
  }
  getAllProducts = () => {
    this.spinner.show();
    const headers = new HttpHeaders({
      'Authorization': "Bearer " + sessionStorage.getItem("access-token")
    });
    return this.http.get(`${this.baseUrl}/get`);
  }

  getProductsByPage=(pageNo:number)=>{
    this.spinner.show();
    return this.http.get(`${this.baseUrl}/products/${pageNo}`);
  }


  getProductById=(id:number)=>{
    this.spinner.show()
    return this.http.get(`${this.baseUrl}/product/${id}`);
  }

  checkStock=(val:string):number=>{
    if(val=="Low Stock") return 1;
    if(val=="In Stock") return 2;
    return 0;
  }

  populateData = () => {
    this.http.get("https://dummyjson.com/products?limit=300").subscribe({
      next: (res: any) => {
        console.log(res);
        let data = res.products;
        let updatedData: Product[] = [];
        data.forEach((i: any) => {
          let product: Product;
          product = {
            imageUrl: i.images[0],
            name: i.title,
            unitPrice: i.price * 75,
            unitsInStock: i.stock,
            isActive: this.checkStock(i.availabilityStatus),
            category: i.category,
            sku: i.sku,
            description: i.description,
            reviews:i.reviews
          }
          updatedData.push(product);
        });
        console.log(updatedData);
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem("access-token")}`
        });
        this.http.post(this.baseUrl + "/populate", updatedData, { headers: headers }).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    });
  }

  addReview=(review:Review,productId:number)=>{
    this.spinner.show();
    return this.http.post(`${this.sharedService.baseUrl}/api/reviews/add/${productId}`,review);
  }
}
