import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User, UserData, UserRegister } from '../../interfaces/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  register(userCredentials: UserRegister): Observable<User>{
    return this.http.post<User>(`${environment.apiBaseUrl}user/`, userCredentials)
  }

  getUsers(): Observable<User[]>{
    // console.log("entré a getUsers") 
    return this.http.get<User[]>(`${environment.apiBaseUrl}user/`)
  }

  update(user_id: string, data: UserData, token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.patch<User>(`${environment.apiBaseUrl}user/${user_id}`, data, httpOptions);
  }

  delete(user_id:string, token:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.delete(`${environment.apiBaseUrl}user/${user_id}`, httpOptions)
  }

}
