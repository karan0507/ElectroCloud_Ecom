import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import{ EventEmitter, forwardRef, OnChanges, Output, SimpleChanges } from '@angular/core';


export type Layout = 'grid'|'grid-with-features'|'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit, OnDestroy {
    @Input() layout: Layout = 'list';
    @Input() grid: 'grid-3-sidebar'|'grid-4-full'|'grid-5-full' = 'grid-3-sidebar';
    @Input() offcanvas: 'always'|'mobile' = 'mobile';
    @Input() product:any;
    @Input() totalPages:string;
    @Input() currentPages:string;
    @Input() totalItems:string;
    @Output() pageChange: EventEmitter<number> = new EventEmitter();
    destroy$: Subject<void> = new Subject<void>();
   prod:any;
    listOptionsForm: FormGroup;
    filtersCount = 0;
    // totalItems: any;
    // totalPages:string;
    // currentPages: any;
    product_list:FormGroup;
    constructor(
        private fb: FormBuilder,
        public sidebar: ShopSidebarService,
        public pageService: PageCategoryService,
        private common:HomeCommonService
    ) 
    {
        //  this.getProducts(); 
    this.product_list = this.fb.group({
        sort:[''],
        limit:['10'],
        page:this.totalPages
    })
        
}
    current(event){
        console.log(event);
        if (event) {
            this.pageChange.emit(event);
        }
    }
    ngOnInit(): void {
        this.setLayout('list');
        // console.log(this.product);
    }

    // getProducts(){
    //     this.common.getProducts().subscribe(products=>{
    //         console.log(products);
    //         console.log(products.products);
    //         console.log(products.products[0].name);
    //         console.log(products.products[0].Merchant.business_name);
    //         this.prod = products.products;
    //         console.log(products.totalItems);
    //         this.totalItems = products.totalItems;
    //         this.totalPages = products.totalPages;
    //         console.log(this.totalPages);
    //         this.currentPages = products.currentPages;
    //     })
    // }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setLayout(value: Layout): void {
        this.layout = 'list';
    }

    resetFilters(): void {
        this.pageService.updateOptions({filterValues: {}});
    }
}
