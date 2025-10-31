import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getSurveyDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/details`);
  }
  getMySurveyList(): Observable<any> {
  // Asume que el token se añade con un HttpInterceptor
  return this.http.get(`${this.apiUrl}/my-list`); 
}
  createSurvey(surveyData: { title: string; description: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, surveyData);
  }

  // Actualiza una encuesta existente
  updateSurvey(id: number, surveyData: { title: string; description: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, surveyData);
  }

  // Elimina una encuesta
  deleteSurvey(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  
}
