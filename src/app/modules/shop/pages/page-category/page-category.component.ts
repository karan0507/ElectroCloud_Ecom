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
import{ EventEmitter, Output} from '@angular/core';
import { products } from 'src/fake-server/database/products';

@Component({
    selector: 'app-grid',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
    providers: [
        {provide: PageCategoryService, useClass: PageCategoryService},
        {provide: ShopSidebarService, useClass: ShopSidebarService},
    ]
})
export class PageCategoryComponent implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    columns: 3|4|5 = 3;
    viewMode: 'grid'|'grid-with-features'|'list' = 'grid';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader: string;
    categorySlug:any;
    prod:any;
    totalItems: any;
    totalPages:string;
    currentPages: number = 0;
    @Output() pageChange: EventEmitter<number> = new EventEmitter();
paginate:string;
    data: any;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageCategoryService,
        private location: Location,
        private common: HomeCommonService
    ) {
        this.route.data.subscribe(product=>{
            console.log(product);
        });
       
        // this.route.data.subscribe((response=>{
        //     this.paginate = response.category;
        //     console.log(this.paginate);
        // }))
        // this.route.params.subscribe(categorySlug=>{
        //     console.log(categorySlug);
        //  this.categorySlug = categorySlug.categorySlug;

        //     if(categorySlug.categorySlug !== undefined && categorySlug.categorySlug !== null){
        //         this.getProducts(categorySlug.categorySlug, this.currentPages);
        //     }
        //     else{
        //         this.categorySlug
        //         this.getProducts('','');
        //     }
        // });
        console.log(this.route.snapshot.params.categorySlug);
       
        
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
    current(event){
        console.log(this.categorySlug);
       
        if(event !== undefined && event !== null && event !== 0 && this.categorySlug !== undefined){
            this.currentPages = event - 1;
            this.getProducts(this.categorySlug, this.currentPages);
        }
        else{
            this.categorySlug = '';
            this.currentPages = 0; 
            this.getProducts(this.categorySlug,this.currentPages);
        }
        // if(this.categorySlug === undefined || this.categorySlug === null){
        //     const temp = 0;
        //     this.getProducts('',temp);
        // }else{
        //     this.currentPages = event - 1;
        // this.getProducts(this.categorySlug, this.currentPages);
        // }
        
    }
    getQueryParams(): Params {
        const params: Params = {};
        const options =  this.pageService.options;
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
    getCategorySlug(): string|null {
        return this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || null;
    }
 
}
