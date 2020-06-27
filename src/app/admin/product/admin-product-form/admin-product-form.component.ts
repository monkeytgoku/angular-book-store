import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit, OnDestroy {

  defaultTikiNow = false;
  publishers = [];
  subcription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.publishers = publishers;
  }

  submit(productForm) {
    const product = new Product(productForm.value);
    this.subcription = this.productService.createProduct(product).subscribe(result => console.log(result));
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
