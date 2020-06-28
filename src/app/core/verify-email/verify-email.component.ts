import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firebaseAuth.$isLoggedInUser.subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/store');
      }
    });
  }

}
