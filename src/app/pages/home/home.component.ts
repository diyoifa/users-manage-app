import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }
}
