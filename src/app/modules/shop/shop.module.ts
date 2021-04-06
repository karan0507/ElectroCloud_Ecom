import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';

// components
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { ShopSidebarComponent } from './components/shop-sidebar/shop-sidebar.component';

// pages
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';
import { PageOrderSuccessComponent } from './pages/page-order-success/page-order-success.component';
import  { InfoComponent } from './custom-products/components/info/info.component';
import { Info1Component } from './custom-products/components/info1/info1.component';
import { Info2Component } from './custom-products/components/info2/info2.component';
import { Info3Component } from './custom-products/components/info3/info3.component';
import { CustomProductsComponent } from './custom-products/custom-products.component';
@NgModule({
    declarations: [
        // components
        ProductsViewComponent,
        ProductTabsComponent,
        ShopSidebarComponent,
        // pages
        PageCartComponent,
        PageCategoryComponent,
        PageCheckoutComponent,
        PageCompareComponent,
        PageProductComponent,
        PageTrackOrderComponent,
        PageWishlistComponent,
        ProductSidebarComponent,
        PageOrderSuccessComponent,
        CustomProductsComponent,
        InfoComponent,
        Info1Component,
        Info2Component,
        Info3Component
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        // modules
        BlocksModule,
        SharedModule,
        ShopRoutingModule,
        WidgetsModule
    ]
})
export class ShopModule { }
