import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit,AfterViewInit {
  constructor(private route:ActivatedRoute, private productService:ProductService,
    private renderer:Renderer2){}
  product:any;
  @ViewChild('productStatus') productStatus!:ElementRef;

  ngOnInit(){
    this.route.data.subscribe((i:any)=>{
      this.product=i.product;
    })
    console.log(this.product);
    
  }
  ngAfterViewInit(): void {
      let pText:string=this.productStatus.nativeElement.innerText;
      console.log(pText);
      if(pText=='Low On Stock'){
        this.renderer.setStyle(this.productStatus.nativeElement,'color','orange');
      }
      else if(pText=='In Stock'){
        this.renderer.setStyle(this.productStatus.nativeElement,'color','#00FF66');
      }
      else this.renderer.setStyle(this.productStatus.nativeElement,'color','red');
  }

  getStatus(val:number){
    if(val==1) return "Low On Stock";
    if(val==2) return "In Stock";
    return "Out Of Stock";
  }

  formatToINR(number:number) {
    return number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  }

}
