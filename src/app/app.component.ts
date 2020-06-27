import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  selectedProductId: string;

  constructor(private authService: AuthService) {
    authService.refreshToken();
  }

  ngOnInit(): void {
  }

  handleSelectedProduct(productId: string): void {
    this.selectedProductId = productId;
  }
}
