import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../../core/services/users.service';
import { EMPTY, catchError } from 'rxjs';
import { User, UserData } from '../../interfaces/user';
import { NotificationComponent } from '../notification/notification.component';
import { Router } from '@angular/router';
import { Action } from '../../interfaces/action';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [PasswordModule, FormsModule, InputTextModule, NotificationComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  // @Output() showFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Input() funcionClick!: () => void;
  @Input() action!: Action;

  username: string = "";
  email: string = "";
  password: string = "";
  notification: string = "";

  constructor(private service:UsersService, private router:Router){ }

  runAction(): void {
    if (this.action.action == "create") {
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
          }else if(error.includes('Error code: 401')){
            this.notification = "Not authenticated plz login first"
          }
          return EMPTY;
        }
      ))
      .subscribe(
        (response: User) => {
          console.log("🚀 ~ file: register.component.ts:51 ~ RegisterComponent ~ register ~ response:", response)
          window.location.reload();
        },
      )
    } else if(this.action.action == "update") {
      let user = localStorage.getItem('user');
      if(user){
        //crear un objeto solo con los campos distintos de vacio
        let data: UserData = {};

        if(this.username != ""){
          data.username = this.username;
        }
        if(this.email != ""){
          data.email = this.email;
        }
        if(this.password != ""){
          data.password = this.password;
        }

        this.service.update(this.action.user_id, data, JSON.parse(user).token)
        .pipe(
          catchError((error: string) => {
            if(error.includes('Error code: 422')){
              this.notification = 'Your email should be a valid email'
            }else if(error.includes('Error code: 409')){
              this.notification = 'This email is already taken'
            }else if(error.includes('Error code: 401')){
              this.notification = "Not authenticated plz login first"
            }
            return EMPTY;
          }
        ))
        .subscribe(
          (response: User) => {
            console.log("🚀 ~ file: register.component.ts:51 ~ RegisterComponent ~ register ~ response:", response)
            window.location.reload();
          },
        )
      }else{
        this.notification = "Not authenticated plz login first"
        this.router.navigateByUrl('/login')
      }
    }

    } 

    closeForm(): void {
      // this.showFormChange.emit(false);
      window.location.reload();
    }

  }

  // ejecutarFuncion(): void {
  //   // Llama a la función recibida como parámetro desde el componente padre
  //   if (this.funcionClick) {
  //     this.funcionClick()
  //     alert("Username: " + this.username + "\nEmail: " + this.email + "\nPassword: " + this.password + "\n\nUser created successfully!")
  //   }
  // }
 

