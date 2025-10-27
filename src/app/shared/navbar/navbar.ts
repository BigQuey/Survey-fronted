import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLoggedIn$;
  userRole$: Observable<string | null>;
  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn$ = auth.isLoggedIn$;
    this.userRole$ = auth.userRole$;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
}
