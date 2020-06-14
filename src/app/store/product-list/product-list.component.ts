import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() selectProduct = new EventEmitter<string>();
  // @Output('selectProduct') selectProduct2 = new EventEmitter<string>();

  products: Product[] = [];
  publishers: string[];
  authors: string[];

  constructor() { }

  ngOnInit(): void {
    this.products = products;
    const publishersObj = {};
    const authorsObj = {};
    products.forEach(ele => {
      publishersObj[ele.publisher] = ele.publisher;
      authorsObj[ele.author] = ele.author;
    });
    this.publishers = Object.keys(publishersObj);
    this.authors = Object.keys(authorsObj);
  }

  onSelectedProduct(productId): void {
    this.selectProduct.emit(productId);
    // this.selectProduct2.emit(productId);
  }

}
