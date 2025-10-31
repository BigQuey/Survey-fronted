import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SurveyService } from '../../core/services/survey';
import { ResponseService } from '../../core/services/response';
import { AuthService } from '../../core/services/auth';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class SurveyDetailComponent {
  surveyId!: number;
  survey: any;
  answers: { [key: number]: string } = {};
  userAnswers: { [key: number]: string } = {};
  loading = true;
  submitted = false;
  viewMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private responseService: ResponseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.viewMode = this.route.snapshot.queryParamMap.get('mode') === 'view';
    this.loadSurvey();
  }

  loadSurvey(): void {
    this.loading = true;

    const surveyDetails$ = this.surveyService.getSurveyDetails(this.surveyId);

    if (this.viewMode) {
      
      const myAnswers$ = this.responseService.getMyAnswers(this.surveyId);

      forkJoin({ survey: surveyDetails$, answers: myAnswers$ }).subscribe({
        next: ({ survey, answers }) => {
          this.survey = survey.data;
          this.userAnswers = this.processAnswers(answers.data);
          this.loading = false;
          console.log(survey.data);
          
        },
        error: (err) => {
          console.error('Error al cargar datos de vista:', err);
          this.loading = false;
        },
      });
    } else {
      
      surveyDetails$.subscribe({
        next: (res) => {
          this.survey = res.data;
          this.loading = false;
          console.log("--------------------------------- \n");
          console.log(JSON.stringify(res.data, null, 2));
          
        },
        error: (err) => {
          console.error('Error al cargar encuesta:', err);
          this.loading = false;
        },
      });
    }
  }
  processAnswers(answerList: any[]): { [key: number]: string } {
    const answerMap: { [key: number]: string } = {};
    for (const ans of answerList) {
      answerMap[ans.questionId] = ans.answer;
    }
    return answerMap;
  }
  submitResponses(): void {
    
    const userEmail = this.authService.getUserEmail();

    const payload = {
      surveyId: this.surveyId,
      userEmail: userEmail,
      answers: Object.entries(this.answers).map(([questionId, response]) => ({
        
        questionId: Number(questionId),
        response: response,
      })),
    };

    this.responseService.submitResponses(payload).subscribe({
      next: () => {
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/surveys/list']), 2000);
      },
      error: (err) => {
        console.error('Error al enviar respuestas:', err);
        alert('Ocurrió un error al enviar tus respuestas. Inténtalo de nuevo.');
      },
    });
  }
}
