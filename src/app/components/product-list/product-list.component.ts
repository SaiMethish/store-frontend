import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
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
  totalElements:number;
  constructor(private productService: ProductService, public sharedService:SharedService, public categoryService:CategoryService, private spinner:NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.getproducts();
    // this.productService.getAllProducts().subscribe((res:any) => {
    //   this.productList = res;
    //   this.spinner.hide();
    // });
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

  getproducts=()=>{
    this.productService.getProductsByPage(this.p).subscribe(
      (res:any)=>{
        this.productList=res.content;
        this.totalElements=res.totalElements;
        this.spinner.hide();
      }
    )
  }

  getByCategoryName=(val:string)=>{
    this.spinner.show();
    this.categoryService.getProductByCategory(val).subscribe({
      next:(res:any)=>{
        this.productList=res;
        this.spinner.hide();
      },
      error:(err:any)=>{
        console.log(err);
        //this.spinner.hide();
      }
    })
  }

}
