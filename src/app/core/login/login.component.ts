import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  isLoading = false;
  error = '';
  subscription: Subscription;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(loginForm): void {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.isLoading = true;
    this.subscription = this.authService.login(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.btnCloseModal.nativeElement.click();
        this.authService.navigateAfterLogin();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

  closeModal(loginForm): void {
    this.error = '';
    loginForm.reset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
