import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';
import { products } from 'src/fake-server/database/products';
import { ActivatedRoute } from '@angular/router';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() layout: ProductLayout;
    @Input() product: any;
    prod:any;
    quantity: FormControl = new FormControl(1);
    image:any;
    inStock:boolean;
   

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        // private cart: CartService,
        // private wishlist: WishlistService,
        // private compare: CompareService,
        // private route: ActivatedRoute,
        public root: RootService,
    ) {
        this.getQuote();
        setTimeout(() => {
            console.log('Product is here on time:',this.product);  // You will get the @Input value
            this.image = this.product.featuredImageUrl;
            if(this.product.isActive !== null){
                this.inStock = true;
            }
        });
        
    
     }

    
     getQuote(){

     }
    // addToCart(): void {
    //     if (!this.addingToCart && this.product && this.quantity.value > 0) {
    //         this.addingToCart = true;

    //         this.cart.add(this.product, this.quantity.value).subscribe({complete: () => this.addingToCart = false});
    //     }
    // }

    // addToWishlist(): void {
    //     if (!this.addingToWishlist && this.product) {
    //         this.addingToWishlist = true;

    //         this.wishlist.add(this.product).subscribe({complete: () => this.addingToWishlist = false});
    //     }
    // }

    // addToCompare(): void {
    //     if (!this.addingToCompare && this.product) {
    //         this.addingToCompare = true;

    //         this.compare.add(this.product).subscribe({complete: () => this.addingToCompare = false});
    //     }
    // }
}
