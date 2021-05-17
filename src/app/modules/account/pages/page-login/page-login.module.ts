import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLoginRoutingModule } from './page-login-routing.module';
import { PageLoginComponent } from './page-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageLoginComponent
  ],
  imports: [
    CommonModule,
    PageLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PageLoginComponent]
})
export class PageLoginModule { }
