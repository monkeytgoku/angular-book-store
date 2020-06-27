import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private newProduct = new Subject<Product>();
  $newProduct = this.newProduct.asObservable();

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  createProduct(product: Product) {
    this.loggingService.logToConsole(product);
    return this.http.post('https://book-store-f2689.firebaseio.com/product.json', product);
  }

  getProducts() {
    return this.http.get('https://book-store-f2689.firebaseio.com/product.json').pipe(
      map(data => {
        const products: Product[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            products.push(new Product({...data[key], id: key}));
          }
        }
        return products;
      })
    );
  }

  getProductById(pid): Observable<Product> {
    return this.http.get(`https://book-store-f2689.firebaseio.com/product/${pid}.json`).pipe(
      map(result => ({ ...new Product(result), id: pid}))
    );
  }

  updateProduct(product: Product) {
    const pid = product.id;
    delete product.id;
    return this.http.put(`https://book-store-f2689.firebaseio.com/product/${pid}.json`, product);
  }

  deleteProduct(pid) {
    return this.http.delete(`https://book-store-f2689.firebaseio.com/product/${pid}.json`);
  }
}
