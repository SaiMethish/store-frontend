import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  p:number=1;
  searchVal!:string;
  searchbyCategoryFlag!:boolean;
  constructor(private productService: ProductService, public sharedService:SharedService, public categoryService:CategoryService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res:any) => {
      this.productList = res;
    });
    this.sharedService.categoryName.subscribe((res)=>{
      if(res!=''){
        this.getByCategoryName(res);
      }
    })
    this.sharedService.searchText.asObservable().subscribe((res)=>{
      this.searchVal=res;
      this.sharedService.categoryFlag.next(false);
      console.log(this.searchVal);
    }); 
    this.sharedService.categoryFlag.asObservable().subscribe((res)=>{
      this.searchbyCategoryFlag=res;
      console.log(this.searchbyCategoryFlag);
    })
  }

  getByCategoryName=(val:string)=>{
    this.categoryService.getProductByCategory(val).subscribe({
      next:(res:any)=>{
        this.productList=res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}
