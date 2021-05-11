import { Injectable, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { empty, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import {map} from 'rxjs/operators';
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

    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        // let params: any = this.route.snapshot.params;
        // console.log(params.page || null);
        // this.currentPages = params.page;
        const categorySlug = route.params.categorySlug || route.data.categorySlug || '';
        // console.log(this.route.queryParams.pipe());
        this.route.queryParams.pipe(
            map((data) => {
                console.log('This is Map0');
                console.log(data.page);
                this.currentPages = data.page || '';
            }
                )
            
        );
    // this.route.queryParamMap.subscribe((params:any)=>{
    //     console.log(params);
    //     this.currentPages = {...params.params.page};
    //     console.log(this.currentPages);
    //     console.log(this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || this.route.snapshot.data || null );
    // })
    console.log(categorySlug);
    if(categorySlug !== undefined) {

    console.log(this.currentPages);

    //  return this.getProducts(categorySlug, this.currentPages);
    return this.common.getProducts(categorySlug, this.currentPages).pipe(
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






getProducts(categorySlug ?, currentPage ?) {
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