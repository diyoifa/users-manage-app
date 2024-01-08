import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserLogin, UserAuthenticated } from '../../interfaces/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(userCredentials: UserLogin): Observable<UserAuthenticated>{
      // debugger;
      return  this.http.post<UserAuthenticated>(`${environment.apiBaseUrl}auth/`, userCredentials)
  }
}
