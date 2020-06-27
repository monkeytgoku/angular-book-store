import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminProductListComponent
  },
  {
    path: ':pid',
    component: AdminProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
