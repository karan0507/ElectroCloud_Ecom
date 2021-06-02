import { /*LOCALE_ID, */NgModule } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localeIt from '@angular/common/locales/it';
//
// registerLocaleData(localeIt, 'it');

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { LazyLoadImageModule } from 'ng-lazyload-image';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';

// modules
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { SharedModule } from './shared/shared.module';
import { WidgetsModule } from './modules/widgets/widgets.module';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

// components
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';

// pages
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageOffcanvasCartComponent } from './pages/page-offcanvas-cart/page-offcanvas-cart.component';
import { ShopModule } from './modules/shop/shop.module';
import { CategoriesComponent } from './modules/shop/components/categories/categories.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { ErrorHandler } from '@angular/core';


Sentry.init({
    dsn: "https://adefe6aeef4e449c856af59432bf45b6@o392066.ingest.sentry.io/5779798",
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ["localhost", "https://api.vidyutcloud.com/"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

@NgModule({
    declarations: [
        // components
        AppComponent,
        RootComponent,
        // pages
        PageHomeOneComponent,
        PageHomeTwoComponent,
        PageNotFoundComponent,
        PageOffcanvasCartComponent,
        CategoriesComponent
    ],
    imports: [
        // modules (angular)
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // modules (third-party)
        CarouselModule,
        ToastrModule.forRoot(),
        // modules
        AppRoutingModule,
        BlocksModule,
        FooterModule,
        HeaderModule,
        MobileModule,
        SharedModule,
        WidgetsModule, 
        ShopModule,
        MatExpansionModule,
        LazyLoadImageModule
    ],
    exports:[
      LazyLoadImageModule
    ],
    providers: [
        // { provide: LOCALE_ID, useValue: 'it' }
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
              showDialog: true,
            }),
          },
          {
            provide: Sentry.TraceService,
            deps: [Router],
          },
          {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true,
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
