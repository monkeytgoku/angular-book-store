import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { forbiddenNameValidator } from 'src/app/shared/directives/forbidden-name.directive';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  isLoading = false;
  error = '';
  subscription: Subscription;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, forbiddenNameValidator(/admin/i)]),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  closeModal(): void {
    this.registerForm.reset();
  }

  register(): void {
    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.name,
      this.registerForm.value.mobile).subscribe(
      resData => {
        this.isLoading = false;
        this.btnCloseModal.nativeElement.click();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }
}
