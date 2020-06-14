import { Component } from '@angular/core';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  selectedProductId: string;

  constructor() {}

  handleSelectedProduct(productId: string): void {
    console.log(productId);
    this.selectedProductId = productId;
  }
}
