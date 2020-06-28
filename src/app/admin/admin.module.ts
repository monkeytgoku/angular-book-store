import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminProductFormComponent } from './product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';
import {
  AdminProductReactiveFormComponent,
} from './product/admin-product-reactive-form/admin-product-reactive-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrderComponent } from './admin-order/admin-order.component';



@NgModule({
  declarations: [AdminProductListComponent, AdminProductDetailComponent, AdminProductFormComponent, AdminProductReactiveFormComponent, AdminOrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminProductListComponent
  ]
})
export class AdminModule { }
