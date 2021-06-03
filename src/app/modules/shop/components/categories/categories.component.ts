import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories:[]=[];


  constructor(private common:HomeCommonService, private router:Router) {
    this.getCategories();

   }

  ngOnInit(): void {
  }
  goToCategory(slug): void {
    // console.log('Hello Friends');
    this.router.navigateByUrl('shop/catalog/' + slug);
    // console.log(slug);
}
  getCategories(){
    this.common.getCategory().subscribe(productcategories =>{
this.categories = productcategories.categories;      
 
    })
  }
}
