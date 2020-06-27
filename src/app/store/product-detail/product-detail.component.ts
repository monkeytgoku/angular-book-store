import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('pid'));
    this.productService.getProductById(this.route.snapshot.paramMap.get('pid'))
      .subscribe(product => this.product = product);

    // this.route.params.pipe(
    //   map(params => params.pid),
    //   switchMap(pid => this.productService.getProductById(pid))
    // ).subscribe(product => this.product = product);
  }

  handleChangedQuantity(quantity) {
    console.log(quantity);
    this.router.navigateByUrl('store/product/-MAo0J1GEigesTMdG7hX');
  }

}
