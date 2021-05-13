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
        // this.getProducts()
        // this.route.data.subscribe(products => {
        //     console.log(products.category);
        //     // this.prod = products.category;
        //     if (products.category.totalItems > 0) {

        //         this.prod = products.category.products;
        //         this.totalItems = products.category.totalItems;
        //         this.totalPages = products.category.totalPages;
        //         this.currentPages = products.category.currentPage + 1;
        //     }
        //     else {
        //         this.prod = [];
        //         console.log('Wrong Parameter');
        //     }
        // });


        this.route.data.subscribe((response=>{
            this.paginate = response.category;
            console.log(this.paginate);
        }))
        this.route.params.subscribe(categorySlug=>{
            console.log(categorySlug);
         this.categorySlug = categorySlug.categorySlug;

            if(categorySlug.categorySlug !== undefined && categorySlug.categorySlug !== null){
                this.getProducts(categorySlug.categorySlug, '');
            }
            else{
                this.categorySlug
                this.getProducts('','');
            }
        });

    }
    current(event) {
        console.log(event);
        const page= JSON.stringify(event - 1);
        this.updateUrl(page)

    }

        // if(event !== undefined && event !== null && event !== 0 && this.categorySlug !== undefined){
        //     this.currentPages = event - 1;
        //     this.getProducts(this.categorySlug, this.currentPages);
        // }
        // else{
        //     this.categorySlug = '';
        //     this.currentPages = 0; 
        //     this.getProducts(this.categorySlug,this.currentPages);
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
    updateUrl(page:string = '0'): void {
        const tree = this.router.parseUrl(this.router.url);
        console.log(tree)
        tree.queryParams = this.getQueryParams(page);
        console.log(tree.queryParams)
        // if(tree.queryParams)
        this.location.replaceState(tree.toString());
        if(this.categorySlug !== undefined && this.categorySlug !== null){
            this.getProducts(this.categorySlug, tree.queryParams.page);
            this.onClick()
        }
        else{
            this.categorySlug
            this.getProducts('',tree.queryParams.page);
            this.onClick()
        }
    }

    getQueryParams(page: string = '0'): Params {
        const params: Params = {};
        const options = this.pageService.options;
        const filterValues = options.filterValues;
        params.page = page;
        return params;
    }


    getProducts(categorySlug?, currentPage?){
        // pageChange = JSON.stringify(pageChange);
        console.log(categorySlug);  
        this.common.getProducts(categorySlug, currentPage).subscribe(products=>{
            if(products.totalItems > 0 ){

                this.prod = products.products;
                console.log(products.totalItems);
                this.totalItems = products.totalItems;
                this.totalPages = products.totalPages;

                this.currentPages = products.currentPage + 1;
                console.log(this.currentPages);
            }
            else
            {
                this.prod=[];
                console.log('Wrong Parameter');
            }

        })
    }
    getCategorySlug(): string | null {
        return this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || null;
    }

    onClick(): void {
        try {
            window.scrollTo({top: 0, left: 0, behavior: 'auto'});
        } catch {
            window.scrollTo(0, 0);
        }
    }

}
