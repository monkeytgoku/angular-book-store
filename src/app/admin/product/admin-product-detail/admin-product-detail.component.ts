import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {
  product: Product;
  isFetching = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params.pid),
      switchMap(pid => this.productService.getProductById(pid))
    ).subscribe(product => {
      this.isFetching = false;
      this.product = product;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
