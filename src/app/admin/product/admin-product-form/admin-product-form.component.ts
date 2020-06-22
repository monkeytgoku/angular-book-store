import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { publishers } from 'src/app/shared/mock-data/publisher-list';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  defaultTikiNow = '0';
  publishers = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.publishers = publishers;
    }, 3000);
  }

  submit(productForm) {
    console.log(productForm.value);
    const isTikiNow = productForm.value.isTikiNow === '1' ? true : false;
    const publisher = publishers.find(ele => ele.$key === productForm.value.publisher);
    const product = new Product({
      ...productForm.value,
      isTikiNow,
      publisher: publisher ? publisher.value : ''
    });
    this.productService.createProduct(product);
  }

}
