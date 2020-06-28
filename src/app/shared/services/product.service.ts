import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Product } from '../models/product';
import { LoggingService } from './logging.service';
import { ProductFilterComponent } from 'src/app/store/product-list/product-filter/product-filter.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private newProduct = new Subject<Product>();
  $newProduct = this.newProduct.asObservable();

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  createProduct(product: Product) {
    this.loggingService.logToConsole(product);
    return this.http.post('https://book-store-f2689.firebaseio.com/product.json', product).pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
