import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate.guard';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('productForm') productForm: NgForm;
  
  defaultTikiNow = false;
  publishers = [];
  subcription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.publishers = publishers;
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  canDeactivate() {
    if (this.productForm.dirty) {
      const res = confirm('Do you want to leave this site?\nChanges you made may not be saved.');
      return res;
    }
    return true;
  }

  submit(productForm): void {
    const product = new Product(productForm.value);
    this.subcription = this.productService.createProduct(product)
      .subscribe(result => this.router.navigateByUrl('/admin'), err => alert(err.message));
  }

  goBack(): void {
    this.location.back();
  }
}
