import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService:CategoryService){}

  categoryList:any[]=[];

  imageMap=new Map();
  ngOnInit() {
    this.imageMap.set("electronics","../../../assets/project-images/Samsung galaxy s23.jpg");
    this.imageMap.set("beauty","../../../assets/project-images/beauty.jpg");
    this.imageMap.set("fashion","../../../assets/project-images/fashion-category.jpg");
    this.imageMap.set("fitness equipment","../../../assets/project-images/fitness.jpg");
    this.imageMap.set("furniture","../../../assets/project-images/furniture.jpg");
    this.imageMap.set("home appliances","../../../assets/project-images/home-appicances-category.jpg");
    this.categoryService.getAllCategories().subscribe((res:any)=>{
      console.log(res);
      this.categoryList=res.filter((i:any)=>{
        return this.imageMap.has(i.categoryName);
      })
      .map((i:any)=>{
        return {...i,
          imageUrl:this.imageMap.get(i.categoryName)}
      });
      console.log(this.categoryList);
    })
    
  }  


}
