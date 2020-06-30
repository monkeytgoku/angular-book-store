import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: User;
  private isLoggedInUser = new BehaviorSubject<boolean>(false);
  $isLoggedInUser = this.isLoggedInUser.asObservable();
  returnUrl = '';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    console.log('FirebaseAuthService');
    this.afAuth.authState.subscribe(user => {
      if (user && user.emailVerified) {
        this.user = user;
        localStorage.setItem('userData', JSON.stringify(this.user));
        this.isLoggedInUser.next(true);
      } else {
        this.isLoggedInUser.next(false);
        localStorage.setItem('userData', null);
      }
    });
  }

  get firebaseUser(): User {
    return JSON.parse(localStorage.getItem('userData'));
  }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    this.isLoggedInUser.next(true);
  }

  async register(email: string, password: string, name: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => res.user.updateProfile({displayName: name}));
    this.sendEmailVerification();
  }

  sendEmailVerification() {
    this.afAuth.currentUser
      .then(user => user.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email']));
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('userData');
    this.isLoggedInUser.next(false);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'));
    return user !== null;
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['store']);
  }

  public navigateAfterLogin(): void {
    if (!this.returnUrl) {
      this.returnUrl = '/store';
    }
    this.router.navigate([this.returnUrl]).then(() => {
      this.returnUrl = '/store';
    });
  }
}
