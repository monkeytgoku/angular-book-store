import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';
import { SharedModule } from '../shared/shared.module';
import { AdminProductFormComponent } from './product/admin-product-form/admin-product-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminProductListComponent, AdminProductDetailComponent, AdminProductFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    AdminProductListComponent
  ]
})
export class AdminModule { }
