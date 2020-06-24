import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/directives/forbidden-name.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('btnCloseModal') btnCloseModal;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required, forbiddenNameValidator(/admin/i)]),
      email: this.fb.control('', Validators.required),
      mobile: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  closeModal(): void {
    this.registerForm.reset();
  }

  register(): void {
    console.log(this.registerForm.value);
    this.btnCloseModal.nativeElement.click();
  }
}
