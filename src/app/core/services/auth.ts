import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users/auth'; // Gateway apuntando al user-service
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  constructor(private http: HttpClient) {
    this.checkTokenAndSetRole();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }
  private checkTokenAndSetRole(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // 5. Extrae el rol del token.
        //    IMPORTANTE: La propiedad puede llamarse 'role', 'roles', 'authorities', etc.
        //    Ajusta 'role' al nombre correcto que usa tu backend en el JWT.
        const role = decodedToken.role; 
        this.userRoleSubject.next(role);
      } catch (error) {
        console.error("Error decodificando el token", error);
        this.logout();
      }
    } else {
      this.userRoleSubject.next(null);
    }
  }
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
