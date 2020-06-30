import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate.guard';

@Component({
  selector: 'app-admin-product-reactive-form',
  templateUrl: './admin-product-reactive-form.component.html',
  styleUrls: ['./admin-product-reactive-form.component.scss']
})
export class AdminProductReactiveFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  productForm: FormGroup;
  publishers = [];
  isLoading = true;

  unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.unsubscribeAll = new Subject();
    this.publishers = publishers;
    this.route.params.pipe(
      takeUntil(this.unsubscribeAll),
      map(params => params.pid),
      switchMap(pid => this.productService.getProductById(pid))
    ).subscribe(product => {
      this.isLoading = false;
      this.initForm(product);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  canDeactivate() {
    if (this.productForm.dirty) {
      const res = confirm('Do you want to leave this site?\nChanges you made may not be saved.');
      return res;
    }
    return true;
  }

  initForm(product): void {
    this.productForm = this.fb.group({
      id: this.fb.control(product.id),
      title: this.fb.control(product.title, Validators.required),
      imageUrl: this.fb.control(product.imageUrl, [Validators.required, Validators.pattern('(http(s?)://).+\.(jpg|jpeg|gif|png)')]),
      author: this.fb.control(product.author, Validators.required),
      finalPrice: this.fb.control(product.finalPrice, Validators.required),
      regularPrice: this.fb.control(product.regularPrice, Validators.required),
      publisher: this.fb.control(product.publisher, Validators.required),
      publishedDate: this.fb.control(product.publishedDate),
      size: this.fb.control(product.size),
      pageCount: this.fb.control(product.pageCount),
      isTikiNow: this.fb.control(product.isTikiNow)
    });
  }

  submit(): void {
    const product = new Product(this.productForm.value);
    this.productService.updateProduct(product).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(result => this.router.navigateByUrl('/admin'));
  }

  goBack(): void {
    this.location.back();
  }

}
