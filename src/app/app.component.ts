import { Component, OnInit } from '@angular/core';

import { products } from './shared/mock-data/product-list';
import { AppUser } from './shared/models/app-user';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  user: AppUser = {
    $key: '1',
    name: 'Tống Minh Giang',
    email: 'monkeytgoku@gmail.com',
    isAdmin: true
  };
  products: Product[] = [];

  notify = [
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
    this.products = products;
  }
}
