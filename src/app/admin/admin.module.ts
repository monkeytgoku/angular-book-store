import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AdminProductListComponent, AdminProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AdminProductListComponent
  ]
})
export class AdminModule { }
