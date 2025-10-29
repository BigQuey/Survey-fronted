import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

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
    // return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    //   tap((res: any) => {
    //     if (res.token) {
    //       localStorage.setItem('token', res.token);
    //       this.isLoggedInSubject.next(true);
    //     }
    //   })
    // );
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
    // Primero, el 'tap' hace los efectos secundarios (guardar token, actualizar estado)
    tap(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.isLoggedInSubject.next(true);
        this.checkTokenAndSetRole(); // Actualiza el BehaviorSubject para el resto de la app
      }
    }),
    // Luego, el 'map' transforma lo que el observable emite al componente
    map(res => {
      if (res.token) {
        const decodedToken: any = jwtDecode(res.token);
        // Devuelve el rol directamente al componente que se suscribió
        return { role: decodedToken.role }; 
      }
      return { role: null };
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
  getCurrentUserRole(): string | null {
    return this.userRoleSubject.getValue();
  }
  
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      // El email del usuario generalmente está en el claim 'sub' (subject).
      // Si tu backend lo pone en otro claim (ej. 'email'), cambia 'sub' por 'email'.
      return decodedToken.sub; 
    } catch (error) {
      console.error("Error decodificando el token al obtener el email", error);
      return null;
    }
  }
}
