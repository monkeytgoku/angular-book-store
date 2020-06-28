import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/directives/forbidden-name.directive';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  registerForm: FormGroup;

  constructor(
    private firebaseAuth: FirebaseAuthService
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
    console.log(this.registerForm.value);
    this.firebaseAuth.register(
      this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name
    ).then(() => this.btnCloseModal.nativeElement.click());
  }
}
