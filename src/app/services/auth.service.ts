import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  //login Method
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home'])

      // if (res.user?.emailVerified == true) {
      //   this.router.navigate(['/home'])
      // } else {
      //   this.router.navigate(['/verify-email'])
      // }
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['/login'])
    })
  }

  //register
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      alert('Register Succesfully')
      this.sendEmailForVarification(res.user);
      console.log("send email success")
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  //sign out
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message)
    })
  }

  //forgot password
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email'])
    }, err => {
      alert('Something went wrong')
    })
  }

  //email varification
  sendEmailForVarification(user: any) {
    user.sendEmailForVarification().then((res: any) => {
      this.router.navigate(['verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

}
