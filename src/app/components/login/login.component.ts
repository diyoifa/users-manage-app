import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';
import { UserAuthenticated } from '../../interfaces/user';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, PasswordModule, InputTextModule, RouterLink, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
   email: string = "";
   password: string = "";
   public UserAuthenticated$!: Observable<UserAuthenticated>;
//    public User!: UserAuthenticated
   public errorMessage!: string;
   private userSubscription?: Subscription;
   constructor(private service: AuthService, private router: Router) { }

//    login() {
//     debugger;
//     if (this.email == "" || this.password == "") {
//         alert("Email and Password are required");
//     } else {
//         this.http.post('http://localhost:8000/auth/', {email: this.email, password: this.password}).subscribe(
//             (res: any) => {
//                 debugger;
//                 alert("Login successful");
//                 console.log(res.token);
//                 //guardar user in the local storage
//                 localStorage.setItem('token', JSON.stringify(res.token));
//                 this.router.navigateByUrl('/dashboard');  
//             },
//             (error: any) => {
//                 alert("Login failed");
//             }
//         )}
//     }

login(): void {
    this.service.login({ email: this.email, password: this.password })
      .pipe(
        catchError((error: string) => {
          if(error.includes('Error code: 401')){
            this.errorMessage = 'Invalid credentials chek your email and password';
          }else if(error.includes('Error code: 422')){
            this.errorMessage = 'Email should be a valid email address';
          }

          return EMPTY;
        })
      )
      .subscribe(
        (userData: UserAuthenticated) => {
          // console.log(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigateByUrl('/dashboard');
        },
      );
}

   ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}