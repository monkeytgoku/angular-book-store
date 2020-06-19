import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  isAdding = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = products;
    this.productService.$newProduct.subscribe(newProduct => {
      this.isAdding = false;
      this.products.push(newProduct);
    });
  }

  viewDetail(product: Product): void {
    this.selectedProduct = product;
  }
}
