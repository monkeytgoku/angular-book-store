import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from '../services/store.service';
import { LoggingService } from 'src/app/shared/services/logging.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [LoggingService]
})
export class ProductListComponent implements OnInit {
  @Output() selectProduct = new EventEmitter<string>();

  products: Product[] = [];
  publishers: string[];
  authors: string[];
  originProducts = products;

  constructor(private storeService: StoreService, private logService: LoggingService) { }

  ngOnInit(): void {
    this.products = products;
    const publishersObj = {};
    const authorsObj = {};
    products.forEach(ele => {
      publishersObj[ele.publisher] = ele.publisher;
      authorsObj[ele.author] = ele.author;
    });
    this.publishers = Object.keys(publishersObj);
    this.authors = Object.keys(authorsObj);
  }

  trackByFn(index, item) {
    return item.id;
  }

  onSelectedProduct(productId): void {
    this.selectProduct.emit(productId);
    // this.storeService.setSelectedProductId(productId);
  }

  search(searchValue): void {
    this.logService.logToConsole(searchValue);
    // const lsSearchValue = searchValue.toLocaleLowerCase();
    // this.products = this.originProducts.filter(
    //   ele => ele.title.toLocaleLowerCase().includes(lsSearchValue)
    //   || ele.author.toLocaleLowerCase().includes(lsSearchValue)
    // );
  }

}
