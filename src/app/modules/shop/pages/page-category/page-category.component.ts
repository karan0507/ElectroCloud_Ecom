import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Link } from '../../../../shared/interfaces/link';
import { of, Subject, timer } from 'rxjs';
// import { debounce, mergeMap, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { parseFilterValue } from '../../../../shared/helpers/filter';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { EventEmitter, Output } from '@angular/core';
import { products } from 'src/fake-server/database/products';
import { getProductsList } from 'src/fake-server';

@Component({
    selector: 'app-page-category',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
    providers: [
        { provide: PageCategoryService, useClass: PageCategoryService },
        { provide: ShopSidebarService, useClass: ShopSidebarService },
    ]
})
export class PageCategoryComponent implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    columns: 3 | 4 | 5 = 3;
    viewMode: 'grid' | 'grid-with-features' | 'list' = 'grid';
    sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader: string;
    categorySlug: any;
    prod: any;
    totalItems: any;
    totalPages: string;
    currentPages: number = 0;
    @Output() pageChange: EventEmitter<number> = new EventEmitter();
    paginate: string;
    data: any;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageCategoryService,
        private location: Location,
        private common: HomeCommonService,

    ) {
        // this.route.data.subscribe(products => {
        //     console.log(products.category);
        //     // this.prod = products.category;
        //     if (products.category.totalItems > 0) {

        //         this.prod = products.category.products;
        //         console.log(products.category.totalItems);
        //         this.totalItems = products.category.totalItems;
        //         this.totalPages = products.category.totalPages;

        //         this.currentPages = products.category.currentPage + 1;
        //         console.log(this.currentPages);
        //     }
        //     else {
        //         this.prod = [];
        //         console.log('Wrong Parameter');
        //     }
        // });
        this.categorySlug = this.getCategorySlug();
        console.log(this.categorySlug);
        if(this.categorySlug !== null && this.categorySlug !== undefined){
            this.getProducts(this.categorySlug,this.currentPages);
            
        }
        else{
            this.getProducts('','');
        }
   
  
   
    }
   
    current(event) {
        console.log(event);
    // this.categorySlug = this.getCategorySlug();
        if(event !== null && event !== undefined && this.categorySlug !== null || this.categorySlug !== undefined ){
if(event > 1)
{            this.currentPages = event - 1;
            console.log(this.currentPages);
            console.log(this.categorySlug);
            this.getProducts(this.categorySlug,this.currentPages);
}else{
    this.currentPages = event;
    console.log(this.currentPages);
    console.log(this.categorySlug);
    this.getProducts(this.categorySlug,this.currentPages);
}
        }
        else{
            this.getProducts('','');
        }
        }

   

    // if (event !== undefined && event !== null && event !== 0 && this.categorySlug !== undefined) {
    //     this.currentPages = event - 1;
    //     console.log(this.currentPages);
    //     console.log(this.categorySlug);
    //     this.getProducts(this.categorySlug, this.currentPages);
    // }
    // else {
    //     this.categorySlug = '';
    //     this.currentPages = 0;
    //     this.getProducts(this.categorySlug, this.currentPages);
    // }


    ngOnInit(): void {
        this.route.data.subscribe(products_details => {
            console.log(products_details);
        });
        //     this.layout = data.layout || this.layout;
        //     this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
        //     this.product = data.product;

        //     this.relatedProducts$ = this.shop.getRelatedProducts(data.product);
        // });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    getQueryParams(): Params {
        const params: Params = {};
        const options = this.pageService.options;
        const filterValues = options.filterValues;

        if ('page' in options && options.page !== 1) {
            params.page = options.page;
        }
        if ('limit' in options && options.limit !== 12) {
            params.limit = options.limit;
        }
        if ('sort' in options && options.sort !== 'default') {
            params.sort = options.sort;
        }
        if ('filterValues' in options) {
            this.pageService.filters.forEach(filter => {
                if (!(filter.slug in filterValues)) {
                    return;
                }

                const filterValue: any = parseFilterValue(filter.type as any, filterValues[filter.slug]);

                switch (filter.type) {
                    case 'range':
                        if (filter.min !== filterValue[0] || filter.max !== filterValue[1]) {
                            params[`filter_${filter.slug}`] = `${filterValue[0]}-${filterValue[1]}`;
                        }
                        break;
                    case 'check':
                    case 'color':
                        if (filterValue.length > 0) {
                            params[`filter_${filter.slug}`] = filterValues[filter.slug];
                        }
                        break;
                    case 'radio':
                        if (filterValue !== filter.items[0].slug) {
                            params[`filter_${filter.slug}`] = filterValue;
                        }
                        break;
                }
            });
        }

        return params;
    }
    getProducts(categorySlug?, currentPage?) {
        // pageChange = JSON.stringify(pageChange);
        console.log(categorySlug);
        this.common.getProducts(categorySlug, currentPage).subscribe(products => {
            if (products.totalItems > 0) {

                this.prod = products.products;
                console.log(products.totalItems);
                this.totalItems = products.totalItems;
                this.totalPages = products.totalPages;

                this.currentPages = products.currentPage+1;
                console.log(this.currentPages);
            }
            else {
                this.prod = [];
                console.log('Wrong Parameter');
            }

        })
    }
    getCategorySlug(): string | null {
        return this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || '';
    }

}
