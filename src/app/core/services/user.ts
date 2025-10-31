import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${API_URL}/list`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/create`, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${API_URL}/update/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/delete/${id}`);
  }
}
