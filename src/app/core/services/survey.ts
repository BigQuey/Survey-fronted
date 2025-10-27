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
  getAllSurveys(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
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
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
