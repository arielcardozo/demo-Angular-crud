import {Component, OnInit} from '@angular/core';

import {AuthService} from './auth/auth.service';

@Component({
selector: 'app-root',
template: `
           <mat-toolbar color="primary">
     <span>CRUD Employees</span>
   </mat-toolbar>
   <div fxLayoutAlign="center">You can access to your employees data!</div>
   <div fxLayout="row">
     <div fxFlex></div>
     <!-- <mat-card fxFlex="300px"> -->

         <!-- <mat-card-header>
           <mat-card-title class="mat-headline">Login</mat-card-title>
         </mat-card-header>
         <mat-card-content> -->
         <router-outlet></router-outlet>
         <!-- </mat-card-content> -->
       <!-- </mat-card> -->
     <div fxFlex></div>
   </div>
`,
       })

export class AppComponent implements OnInit{
  title = 'Angular8ClientCrud';
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
