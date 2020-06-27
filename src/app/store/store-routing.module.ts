import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
        path: '',
        component: OrderSuccessComponent
      }
    ]
  },
  {
    path: 'product/:pid',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'shipping',
    component: ShippingFormComponent
  },
  {
    path: 'checkout',
    component: CheckOutComponent
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent
  },
  {
    path: 'my-oders',
    component: MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
