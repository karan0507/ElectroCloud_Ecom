import { Injectable, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { empty, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})



export class CategoryResolverService implements Resolve<[]> {

    currentPages: any = 0;
    totalPages: any;
    totalItems: any;
    selectedId: number;
    constructor(
        private root: RootService,
        private router: Router,
        private common: HomeCommonService,
        private route: ActivatedRoute,
        private location: Location

    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        console.log('resolver')
        // let params: any = this.route.snapshot.params;
        // console.log(params.page || null);
        // this.currentPages = params.page;
        const categorySlug = route.params.categorySlug || route.data.categorySlug || '';


        

      
        console.log(route.queryParams);
        this.location.onUrlChange( (url: string, state: unknown) => {
            console.log("Location changes to "+url);
            console.log(state);
            if(route.queryParams === {}){
                route.queryParams = {page:"0"}
                this.currentPages = route.queryParams.page
            }
            console.log(this.route.queryParams);
            console.log(route.queryParams)
            console.log(categorySlug);
            if (categorySlug === undefined) {
    
                console.log(this.currentPages);
    
                //  return this.getProducts(categorySlug, this.currentPages);
                return this.common.getProducts(categorySlug, route.queryParams.page).pipe(
                    catchError((error) => {
                        return error;
                    })
                )
            }
            else {
                console.log(route.queryParams.page)
                console.log("OHhhh bhaaiii");
                //    return this.getProducts('','');
                return this.common.getProducts('',route.queryParams.page).pipe(
                    
                    catchError((error) => {
    
                        return empty();
                    })
                )
            }
          })

        console.log(categorySlug);
        if (categorySlug === undefined) {

            console.log(this.currentPages);

            //  return this.getProducts(categorySlug, this.currentPages);
            return this.common.getProducts(categorySlug, route.queryParams.page).pipe(
                catchError((error) => {
                    return error;
                })
            )
        }
        else {
            console.log("OHhhh bhaaiii");
            //    return this.getProducts('','');
            return this.common.getProducts('', '').pipe(

                catchError((error) => {

                    return empty();
                })
            )
        }

    }






    getProducts(categorySlug?, currentPage?) {
        // pageChange = JSON.stringify(pageChange); 
        this.common.getProducts(categorySlug, currentPage).subscribe(products => {
            if (products.totalItems > '0') {
                //   this.totalPages = products.totalPages;
                this.totalItems = products.totalItems;
                this.totalPages = products.totalPages;
                this.currentPages = products.currentPage + 1;
                console.log("This is the main If Block");
                console.log(products);
                const products_details = products;
                console.log(products_details);
                return products_details;

                // return {totalItems: this.totalItems,products:products,totalPages:this.totalPages,currentPages:this.currentPages};
            }
            else {
                console.log("This is Else Block");
                return [];
                // this.prod=[];
                // console.log('Wrong Parameter');
            }

        })
    }

}
//////         this.router.navigateByUrl.arguments
//   .queryParams
//   .subscribe(params => {
//     this.selectedId = +params['page'];
//     console.log(this.selectedId);
//   });
// let params: any = this.route.snapshot.params;
// console.log(params.page || null);
// this.currentPages = params.page;