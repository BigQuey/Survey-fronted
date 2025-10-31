import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'http://localhost:8080/api/responses';

  constructor(private http: HttpClient) {}

  submitResponses(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, payload);
  }
  getSurveyStats(surveyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/survey/${surveyId}`);
  }
  getMyAnswers(surveyId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/by-user-and-survey`, { 
    params: { surveyId: surveyId.toString() } 
  });
}
}