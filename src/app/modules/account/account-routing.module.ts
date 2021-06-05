import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from 'src/app/login.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: PageDashboardComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'profile',
                component: PageProfileComponent,
                canActivate: [LoginGuard]
            
            },
            {
                path: 'addresses',
                component: PageAddressesListComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'addresses/:addressId',
                component: PageEditAddressComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'orders',
                component: PageOrdersListComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'orders/:orderId',
                component: PageOrderDetailsComponent,
                canActivate: [LoginGuard]
            },
            {
                path: 'password',
                component: PagePasswordComponent,
                canActivate: [LoginGuard]
            }
        ]
    },
   
    {
        path: 'register',
        component:RegisterComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
