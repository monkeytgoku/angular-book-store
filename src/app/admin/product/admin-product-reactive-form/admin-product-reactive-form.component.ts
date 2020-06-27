import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-reactive-form',
  templateUrl: './admin-product-reactive-form.component.html',
  styleUrls: ['./admin-product-reactive-form.component.scss']
})
export class AdminProductReactiveFormComponent implements OnInit {
  @Input() product: Product;

  productForm: FormGroup;
  publishers = [];

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.publishers = publishers;
    this.productForm = this.fb.group({
      id: this.fb.control(this.product.id),
      title: this.fb.control(this.product.title, Validators.required),
      imageUrl: this.fb.control(this.product.imageUrl, [Validators.required, Validators.pattern('(http(s?)://).+\.(jpg|jpeg|gif|png)')]),
      author: this.fb.control(this.product.author, Validators.required),
      finalPrice: this.fb.control(this.product.finalPrice, Validators.required),
      regularPrice: this.fb.control(this.product.regularPrice, Validators.required),
      publisher: this.fb.control(this.product.publisher, Validators.required),
      publishedDate: this.fb.control(this.product.publishedDate),
      size: this.fb.control(this.product.size),
      pageCount: this.fb.control(this.product.pageCount),
      isTikiNow: this.fb.control(this.product.isTikiNow)
    });
  }

  submit(): void {
    const product = new Product(this.productForm.value);
    this.productService.updateProduct(product).subscribe(result => console.log(result));
  }

}
