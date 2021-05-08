import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    relatedProducts$: Observable<Product[]>;

    product: any;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    withSidebar:false;
    slug:string;
    constructor(
        private shop: ShopService,
        private route: ActivatedRoute,
        private common:HomeCommonService
    ) { 
        this.route.params.subscribe(productSlug=>{
            console.log(productSlug);
         this.slug = productSlug.productSlug;

            if(productSlug.productSlug !== undefined && productSlug.productSlug !== null){
                this.getSingleProduct(this.slug);
            }
            else{
                this.getSingleProduct('');
            }
        });
    }

    ngOnInit(): void {
        // this.route.data.subscribe(data => {
        //     console.log(data);
        //     this.layout = data.layout || this.layout;
        //     this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
        //     this.product = data.product;

        //     this.relatedProducts$ = this.shop.getRelatedProducts(data.product);
        // });
    }
    getSingleProduct(slug){
        this.common.getSingleProduct(slug).subscribe(prod=>{
            console.log(prod);
            this.product = prod;
            console.log(this.product);
        })
    }
}
