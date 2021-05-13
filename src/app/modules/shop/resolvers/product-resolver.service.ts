import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
    constructor(
        private root: RootService,
        private router: Router,
        private shop: HomeCommonService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const productSlug = route.params.productSlug ;
        console.log(route.params.productSlug);

        return this.shop.getSingleProduct(productSlug).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 400) {
                    this.router.navigate([this.root.notFound()]).then();
                }

                return EMPTY;
            })
        );
    }
}
