import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService:CategoryService, private sharedService:SharedService ){}

  categoryList:any[]=[];

  imageMap=new Map();
  ngOnInit() {
    this.imageMap.set("electronics","../../../assets/project-images/Samsung galaxy s23.jpg");
    this.imageMap.set("beauty","../../../assets/project-images/beauty.jpg");
    this.imageMap.set("fashion","../../../assets/project-images/fashion-category.jpg");
    this.imageMap.set("groceries","../../../assets/project-images/fitness.jpg");
    this.imageMap.set("furniture","../../../assets/project-images/furniture.jpg");
    this.imageMap.set("home appliances","../../../assets/project-images/home-appicances-category.jpg");
    this.categoryService.getAllCategories().subscribe((res: any) => {
      const mappedCategories = res.filter((i: any) => {
        return this.imageMap.has(i.categoryName);
      }).map((i: any) => {
        return {
          ...i,
          imageUrl: this.imageMap.get(i.categoryName)
        };
      });
      const uniqueCategories = Array.from(
        new Map(mappedCategories.map((item: any) => [item.categoryName, item])).values()
      );
      this.categoryList = uniqueCategories;
      console.log(this.categoryList);
    });
    
  }  

  
}
