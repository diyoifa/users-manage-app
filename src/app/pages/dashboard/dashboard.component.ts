import { Component, OnInit} from '@angular/core';
import { DataTableUsersComponent } from '../../components/data-table-users/data-table-users.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UsersService } from '../../core/services/users.service';
// import { NotificationComponent } from '../../components/notification/notification.component';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User, UserInfo } from '../../interfaces/user';
// import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Action } from '../../interfaces/action';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [DataTableUsersComponent, UserFormComponent, NavBarComponent]
})


export class DashboardComponent implements OnInit{
  userInfo!: UserInfo
  showFormCreate: boolean = false
  // users: User[] | undefined;
  users: User[] = [];
  public users$!: Observable<User[]>;
  public errorMessage!: string;
  public action!: Action;


  constructor(private userService: UsersService, private router: Router) { }
  
  ngOnInit(): void {
    // this.users$ = 
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
    }
    this.userService.getUsers()
    .pipe(
        catchError((error: string) => {
          if(error.includes('Error code: 401')){
            this.errorMessage = 'Invalid credentials chek your email and password';
          }else if(error.includes('Error code: 422')){
            this.errorMessage = 'Email should be a valid email address';
          }
          console.log(error)
          return EMPTY;
        })
    )
    .subscribe(
      (users: User[]) => {
        this.users = users;
        // console.log('Usuarios obtenidos:', this.users);
        // Agrega aquí cualquier lógica adicional que necesites con los usuarios obtenidos
      }
    )
    
  }

  // ngOnInit(): void {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //       console.log('Usuarios obtenidos:', this.users);
  //       // Agrega aquí cualquier lógica adicional que necesites con los usuarios obtenidos
  //     },
  //     (error) => {
  //       console.error('Error al obtener usuarios:', error);
  //       // Agrega aquí la lógica para manejar el error, como establecer un mensaje de error
  //       this.errorMessage = 'Hubo un error al obtener usuarios. Por favor, inténtalo de nuevo más tarde.';
  //     }
  //   );
  // }

  onShowFormChange(value: UserInfo): void {
    console.log(value)
    this.userInfo = value;
  }

  showFormCreateFunc():void {
    this.showFormCreate = true
  }
  // edit(){
  //   alert('edit');
  // }
  // create(){
  //   alert('create')
  // }
}
