import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

import { EMPTY, Observable, catchError } from 'rxjs';
import {UsersService} from '../../core/services/users.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, NotificationComponent, DialogModule, PasswordModule, InputTextModule, RouterLink, NotificationComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   username: string = "";
   email: string = "";
   password: string = "";
   notification: string = "";
   
  constructor(private service: UsersService, private router: Router) { }

  register(){
    if(this.username == "" || this.email == "" || this.password == ""){
      this.notification = "All fields are required";
      return;
    }
    this.service.register({username: this.username, email: this.email, password: this.password})
    .pipe(
      catchError((error: string) => {
        if(error.includes('Error code: 422')){
          this.notification = 'Your email should be a valid email'
        }else if(error.includes('Error code: 409')){
          this.notification = 'This email is already taken'
        }
        return EMPTY;
      }
    ))
    .subscribe(
      (response: User) => {
        console.log("🚀 ~ file: register.component.ts:51 ~ RegisterComponent ~ register ~ response:", response)
        this.router.navigateByUrl('/login');
      },
    )
  }

}
