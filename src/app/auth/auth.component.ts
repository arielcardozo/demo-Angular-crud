import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = '';

  constructor(private  authService: AuthService,
              private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }


  onSubmit(authForm: NgForm) {
    if ( !authForm.valid){
      return;
    }
      this.isLoading = true;
      const email = authForm.value.email;
      const password = authForm.value.password;
      let autObs: Observable<AuthResponseData>;
    if ( this.isLoginMode ){
      autObs = this.authService.login(email, password);
    }else{
      this.authService.signUp(email, password);
    }

    autObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/employees']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });
    console.log("--->" + this.error);
  }
}
