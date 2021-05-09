import { Injectable, Input } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Injectable({
    providedIn: 'root'
})



export class CategoryResolverService implements Resolve<any> {
 
    currentPages:any = 0;
    totalPages:any;
    totalItems:any;
    constructor(
        private root: RootService,
        private router: Router,
        private common: HomeCommonService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const categorySlug = route.params.categorySlug || route.data.categorySlug || null;

        // this.getProducts(categorySlug, this.currentPages);
       
        if(categorySlug !== undefined && categorySlug !== null){
                    this.getProducts(categorySlug, this.currentPages);
                    
                }
                else{
                    this.getProducts('','');
                } 
            }



    getProducts(categorySlug?, currentPage?){
        // pageChange = JSON.stringify(pageChange); 
        this.common.getProducts(categorySlug, currentPage).subscribe(products=>{
            if(products.totalItems > 0 ){
            //   this.totalPages = products.totalPages;
                this.totalItems = products.totalItems;
                this.totalPages = products.totalPages;
                this.currentPages = products.currentPage + 1;
                console.log("This is If Block");
                   console.log(products);
                const products_details = products;
                   return products_details;             

                // return {totalItems: this.totalItems,products:products,totalPages:this.totalPages,currentPages:this.currentPages};
            }
            else
            {
                console.log("This is Else Block");
                return [];
                // this.prod=[];
                // console.log('Wrong Parameter');
            }
           
        })
    }
}
