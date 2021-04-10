import { Component, OnInit } from '@angular/core';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;

  constructor(private common:HomeCommonService) {
    this.getCategories();
   }

  ngOnInit(): void {
  }
  getCategories(){
    this.common.getCategories().subscribe(productcategories =>{
      console.log('hello');
      console.log(productcategories);
      
      this.categories = productcategories;
    })
  }
}
