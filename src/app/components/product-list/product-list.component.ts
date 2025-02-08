import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList:Product[]=[];

  constructor(private productService:ProductService){}

  ngOnInit() {
      this.productService.getAllProducts().subscribe((res:any)=>{
        this.productList=res.slice(1,17);
        console.log(this.productList);
      })
      console.log(this.productList)
  }
  
}
