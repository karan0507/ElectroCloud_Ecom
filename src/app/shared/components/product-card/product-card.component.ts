import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product, ProductAttribute } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HomeCommonService } from '../../services/home-common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy, OnChanges {
    private destroy$: Subject<void> = new Subject();

    @Input() product: any;
    @Input() layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal' | null = null;
    // loggedIn:any;
    isLogin: boolean;
    display1: boolean;
    display2: boolean;
    category_type: any;
    quote: boolean;
    quote2: boolean;
    contact: boolean;
    merchantInfo: any;
    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingQuickview = false;
    // featuredAttributes: ProductAttribute[] = [];
    prod: any;

    constructor(
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public compare: CompareService,
        public quickview: QuickviewService,
        public currency: CurrencyService,
        private common: HomeCommonService,
        private router: Router,


    ) {
        setTimeout(() => {
            //    console.log(this.product); 
            this.merchantInfo = this.product.Merchant;

        });
    }


    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();

        });
        // console.log(this.product);
    }
    // ***** Dialog Section for contact us and custom form**********//////////////


    showResponsiveDialog() {
        this.cd.detectChanges();
        this.cd.markForCheck();
        this.isLogin = JSON.parse(localStorage.getItem("loggedIn"));
        console.log(this.isLogin);
        this.display1 = true;
    }


    // ***************End Section*************** //

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnChanges() {
    
    }
    // ngOnChanges(changes: SimpleChanges): void {
    //     if ('product' in changes) {
    //         this.featuredAttributes = !this.product ? [] : this.product.attributes.filter(x => x.featured);
    //     }
    // }
    contactUs() {
        this.isLogin = JSON.parse(localStorage.getItem("loggedIn"));
        console.log(this.isLogin);
        this.display2 = true;

    }
    // addToCart(): void {
    //     if (this.addingToCart) {
    //         return;
    //     }

    //     this.addingToCart = true;
    //     this.cart.add(this.product, 1).subscribe({
    //         complete: () => {
    //             this.addingToCart = false;
    //             this.cd.markForCheck();
    //         }
    //     });
    // }

    // addToWishlist(): void {
    //     if (this.addingToWishlist) {
    //         return;
    //     }

    //     this.addingToWishlist = true;
    //     this.wishlist.add(this.product).subscribe({
    //         complete: () => {
    //             this.addingToWishlist = false;
    //             this.cd.markForCheck();
    //         }
    //     });
    // }

    // addToCompare(): void {
    //     if (this.addingToCompare) {
    //         return;
    //     }

    //     this.addingToCompare = true;
    //     this.compare.add(this.product).subscribe({
    //         complete: () => {
    //             this.addingToCompare = false;
    //             this.cd.markForCheck();
    //         }
    //     });
    // }

    showQuickview(): void {
        if (this.showingQuickview) {
            return;
        }

        this.showingQuickview = true;
        this.quickview.show(this.product).subscribe({
            complete: () => {
                this.showingQuickview = false;
                this.cd.markForCheck();
            }
        });
    }
}
