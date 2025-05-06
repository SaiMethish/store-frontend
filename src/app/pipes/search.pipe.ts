import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';
import { ProductService } from '../service/product.service';
import { SharedService } from '../service/shared.service';

@Pipe({
  name: 'search',
  pure:false
})
export class SearchPipe implements PipeTransform {
  categoryMap:Map<string,string[]>;
  //categoryCheck!:boolean;
  constructor(private productService:ProductService,private sharedService:SharedService){
    this.categoryMap=this.productService.categoryMap;
    // this.sharedService.categoryFlag.asObservable().subscribe((res)=>{
    //   this.categoryCheck=res;
    // })
  }

  transform(items:any[],searchText:string,check:boolean): any[] {
    if(!items) return [];
    if(!searchText) return items;
    console.log(check);
    searchText=searchText.toLowerCase();
    return items.filter((item)=>{
      return item.name.toLowerCase().includes(searchText);
    });
  }

}
