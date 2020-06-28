import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit, OnDestroy {
  @ViewChild('btnClosePopup') btnCloseConfirmPopup;

  products: Product[] = [];
  isFetching = true;

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(result => {
      this.isFetching = false;
      this.products = result;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addProduct() {
    this.router.navigate(['product', 'new'], { relativeTo: this.route });
  }

  viewDetail(product: Product): void {
    this.router.navigate(['product', product.id], { relativeTo: this.route });
  }

  editProduct(product: Product) {
    this.router.navigate(['product', product.id, 'edit'], { relativeTo: this.route });
  }

  deleteProduct(product: Product) {
    const res = confirm('Are you sure you want to delete?');
    if (res) {
      this.productService.deleteProduct(product.id).subscribe(result => console.log(result));
    }
  }
}
