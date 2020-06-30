import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StoreService } from 'src/app/store/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('loginBtn') loginBtn;

  authUser: AuthUser;
  isAuthenticated = false;
  isAdmin = false;

  private unsubscribeAll: Subject<any>;

  notifys = [
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    },
    {
      content: 'Từ 29/2/2020, Tiki miễn phí giao tiêu chuẩn cho đơn hàng từ 250k, áp dụng phí 19k cho đơn hàng dưới 250k.',
      date: '28/02/2020'
    }
  ];
  cartCount = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getCartCount();

    this.unsubscribeAll = new Subject();

    this.storeService.changeCart$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(
      res => {
        if (res) {
          this.getCartCount();
        }
      }
    );

    this.authService.authUser.pipe(
      takeUntil(this.unsubscribeAll),
      switchMap(authUser => {
        this.authUser = authUser;
        this.isAuthenticated = !!authUser;
        if (authUser) {
          return this.authService.getUserRoles(authUser.id);
        }
        return of(null);
      })
    ).subscribe(roles => {
      if (roles) {
        this.isAdmin = roles.admin;
      } else {
        this.isAdmin = false;
      }
    });

    this.authService.showLogin.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(res => {
      if (res) {
        this.loginBtn.nativeElement.click();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(cart)) {
      this.cartCount = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    }
  }

  logout() {
    this.authService.logout();
  }

  goToCart() {
    this.router.navigateByUrl('/store/cart');
  }
}
