import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  subcription1: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.publishers = publishers;
    const fromArrayObservable = interval(1000);
    this.subcription1 = fromArrayObservable.pipe(
      map(data => data * 2),
      filter(data => data < 4)
    ).subscribe(data => console.log(data), error => console.log(error), () => {});
  }

  submit(productForm) {
    const product = new Product(productForm.value);
    this.productService.createProduct(product).subscribe(result => console.log(result));
  }

  ngOnDestroy() {
    this.subcription1.unsubscribe();
  }
}
