import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit, OnDestroy {
  @ViewChild('btnClosePopup') btnCloseConfirmPopup;

  products: Product[] = [];
  selectedProduct: Product;
  isAdding = false;
  isEditting = false;

  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(result => this.products = result);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  viewDetail(product: Product): void {
    this.selectedProduct = product;
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.isEditting = true;
  }

  deleteProduct(product: Product) {
    const res = confirm('Are you sure you want to delete?');
    if (res) {
      this.productService.deleteProduct(product.id).subscribe(result => console.log(result));
    }
  }
}
