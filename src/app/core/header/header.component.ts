import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: AppUser = {
    $key: '1',
    name: 'Tống Minh Giang',
    email: 'monkeytgoku@gmail.com',
    mobile: '0949348386',
    isAdmin: true
  };
  notify = [
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
