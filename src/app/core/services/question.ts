import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/api/questions';
  constructor(private http: HttpClient) { }

  
  getQuestionsForSurvey(surveyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/survey/${surveyId}`);
  }

  
  createQuestion(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  
  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${questionId}`);
  }


  
}