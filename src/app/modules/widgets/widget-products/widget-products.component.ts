import { Component, Input } from '@angular/core';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { Product } from '../../../shared/interfaces/product';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-widget-products',
    templateUrl: './widget-products.component.html',
    styleUrls: ['./widget-products.component.scss']
})
export class WidgetProductsComponent {
prod1:any;
    @Input() header :String;
    @Input() products: Product[] = [];
@Input() prod:any;
    constructor(public root: RootService, private common:HomeCommonService) { 
        this.ngOnIt();
    }
    ngOnIt():void{
        setTimeout(() => {
            this.common.getLatestProducts().subscribe(prod2=>{
                console.log('Product is here on time:',prod2);
                this.prod1 = prod2;
            })
             // You will get the @Input value
            // this.attribute = this.product.ProductAttributes;
            // console.log(this.attribute);
        });
    
    }
}
