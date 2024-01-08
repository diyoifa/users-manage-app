import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  apiBaseUrl = environment.apiBaseUrl;
  
  logOut(): void {
    localStorage.removeItem('user')
    window.location.reload() 
  }
  
}
