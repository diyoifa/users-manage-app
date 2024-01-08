import { Component,   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'  
})
export class AppComponent {
  title = 'usersAdministration';
}

