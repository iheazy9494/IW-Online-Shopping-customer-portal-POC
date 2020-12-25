import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ]
    )
  ]
})
export class MyAccountComponent implements OnInit, OnDestroy {

  user: any = {};
  loginForm: FormGroup;
  loading = false;
  error = '';
  loginError: string;
  emailNotFound;
  emailNotVerified;
  hide = true;
  loginSub: Subscription = new Subscription();
  checkEmailSub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['/home'])
    }

  }

  login() {
    this.loading = true;
    this.checkEmailSub = this.authService.checkEmail(this.user.email).subscribe(res => {
      this.loading = false;
      if (res['message'] === 'user not Found') {
        this._snackBar.open('Email Not Found!', '', {
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      }
      else if (res['message'] === 'Email not verified') {
        this._snackBar.open('Email Not Verified!', '', {
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
          //this.router.navigate(['auth/Verify'])
        }, 1500);
      }
      else {
        this.loginSub = this.authService.login(this.user.email, this.user.password).subscribe((data: any) => {
          if (this.authService.isLoggedIn) {
            this.router.navigate(['/home']);
          }

        },
          error => {
            if (JSON.stringify(error).includes('400')) {
              this._snackBar.open('Invalid email or password!', '', {
                duration: 2000,
              });
              setTimeout(() => {
                this.loading = false;
              }, 1500);
            } else {
              this.error = error
              this.loading = false;
            }
          }

        );
      }
    },
      error => {
        this.error = error
        this.loading = false;
      })

  }



  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
    if (this.checkEmailSub) {
      this.checkEmailSub.unsubscribe();
    }
  }

}
