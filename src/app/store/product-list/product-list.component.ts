import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [LoggingService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  publishers: string[];
  authors: string[];
  isFetchData = false;
  private unsubscribeAll: Subject<any>;

  constructor(
    private productService: ProductService,
    private logService: LoggingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isFetchData = true;
    this.productService.getProducts().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(result => {
      this.products = result;
      this.isFetchData = false;
    });
    this.route.queryParams.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(params => console.log(params));

    const publishersObj = {};
    const authorsObj = {};
    products.forEach(ele => {
      publishersObj[ele.publisher] = ele.publisher;
      authorsObj[ele.author] = ele.author;
    });
    this.publishers = Object.keys(publishersObj);
    this.authors = Object.keys(authorsObj);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSelectedProduct(productId): void {
    // this.router.navigateByUrl(`/store/product/${productId}`);
    // this.router.navigate(['store', 'product', productId]);
    this.router.navigate(['product', productId], { relativeTo: this.route, queryParams: { order: 'popular' } });
  }

  search(searchValue): void {
    this.logService.logToConsole(searchValue);
    // const lcSearchValue = searchValue.toLocaleLowerCase();
    // this.products = this.originProducts.filter(
    //   ele => ele.title.toLocaleLowerCase().includes(lcSearchValue)
    //   || ele.author.toLocaleLowerCase().includes(lcSearchValue)
    // );
  }

}
