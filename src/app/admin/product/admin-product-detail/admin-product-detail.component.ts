import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {
  private _product: Product;
  productKeys: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set product(p: Product) {
    this._product = p;
    if (p) {
      this.productKeys = Object.keys(p);
    }
  }

  get product() {
    return this._product;
  }

}
