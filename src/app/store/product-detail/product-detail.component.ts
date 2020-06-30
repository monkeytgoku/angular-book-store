import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { isArray } from 'util';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('pid'));
    this.productService.getProductById(this.route.snapshot.paramMap.get('pid'))
      .subscribe(product => this.product = product);

    // this.route.params.pipe(
    //   map(params => params.pid),
    //   switchMap(pid => this.productService.getProductById(pid))
    // ).subscribe(product => this.product = product);
  }

  handleChangedQuantity(quantity) {
    this.quantity = quantity;
  }

  addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && Array.isArray(cart)) {
      cart.push({ product: this.product, quantity: this.quantity });
    } else {
      cart = [{ product: this.product, quantity: this.quantity }];
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.storeService.updateCart();
  }

}
