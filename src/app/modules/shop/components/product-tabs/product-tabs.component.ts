import { Component, Input } from '@angular/core';
import { ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';
    @Input() product:any;
    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;
    attribute:any;
    
    constructor() {
        
        setTimeout(() => {
            console.log('Product is here on time:',this.product);  // You will get the @Input value
            this.attribute = this.product.ProductAttributes;
            console.log(this.attribute);
           
        });
    }
   
   
    }
