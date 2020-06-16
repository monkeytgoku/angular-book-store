import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './store/product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  // @ViewChild('productList') productList: ProductListComponent;
  // @ViewChild(ProductListComponent) productList: ProductListComponent;

  selectedProductId: string;

  constructor() {}

  handleSelectedProduct(productId: string): void {
    this.selectedProductId = productId;
  }

  // search() {
  //   this.productList.search('vui');
  // }
}
