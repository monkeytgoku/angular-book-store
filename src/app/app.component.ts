import { Component } from '@angular/core';
import Product from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  product: Product;
  avarta;
  user = {
    firstName: 'Tống',
    lastName: 'Minh Giang'
  };

  notify = [
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k. Thay đổi áp dụng cho khách hàng không phải là thành viên TikiNOW.',
      date: '28/02/2020'
    }
  ];

  constructor() {

  }
}
