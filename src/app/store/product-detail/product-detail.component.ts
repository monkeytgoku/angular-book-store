import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() productId: string;

  product: Product;

  constructor() { }

  ngOnChanges(productId: {previousValue, currentValue, firstChange}) {
    console.log(productId);
    this.product = products.find(ele => ele.$key === this.productId);
  }

  ngOnInit(): void {
  }

  handleChangedQuantity(quantity) {
    console.log(quantity);
  }

}
