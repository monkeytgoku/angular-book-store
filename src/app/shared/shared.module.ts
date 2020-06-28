import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityComponent } from './components/quantity/quantity.component';
import { PricePipe } from './pipes/price.pipe';
import { DiscountPipe } from './pipes/discount.pipe';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { ForbiddenNameDirective } from './directives/forbidden-name.directive';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    QuantityComponent,
    PricePipe,
    DiscountPipe,
    PopupConfirmComponent,
    ForbiddenNameDirective,
    LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    QuantityComponent,
    PricePipe,
    DiscountPipe,
    PopupConfirmComponent,
    ForbiddenNameDirective,
    LoadingComponent
  ]
})
export class SharedModule { }
