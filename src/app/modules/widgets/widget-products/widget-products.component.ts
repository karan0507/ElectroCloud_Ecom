import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-widget-products',
    templateUrl: './widget-products.component.html',
    styleUrls: ['./widget-products.component.scss']
})
export class WidgetProductsComponent {
    @Input() header = '';
    @Input() products: Product[] = [];
@Input() prod:any;
    constructor(public root: RootService) { 
        this.ngOnIt();
    }
    ngOnIt():void{
        setTimeout(() => {
            console.log('Product is here on time:',this.prod);  // You will get the @Input value
            // this.attribute = this.product.ProductAttributes;
            // console.log(this.attribute);
        });
    
    }
}
