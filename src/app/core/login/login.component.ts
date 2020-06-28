import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  invalidUser = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private firebaseAuth: FirebaseAuthService
  ) { }

  ngOnInit(): void {
  }

  login(loginForm): void {
    this.invalidUser = false;
    const user = loginForm.value;
    this.firebaseAuth.login(user.email, user.password).then(
      () => {
        this.invalidUser = false;
        this.btnCloseModal.nativeElement.click();
      }
    ).catch(
      () => this.invalidUser = true
    );
    // this.subscription = this.authService.login(user).subscribe(result => {
    //   if (result) {
    //     this.invalidUser = false;
    //     this.btnCloseModal.nativeElement.click();
    //   } else {
    //     this.invalidUser = true;
    //   }
    // });
  }

  closeModal(loginForm): void {
    this.invalidUser = false;
    loginForm.reset();
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

}
