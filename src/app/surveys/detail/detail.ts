import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SurveyService } from '../../core/services/survey';
import { ResponseService } from '../../core/services/response';

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
  loading = true;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSurvey();
  }

  loadSurvey(): void {
    this.surveyService.getSurveyDetails(this.surveyId).subscribe({
      next: (res) => {
        this.survey = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar encuesta:', err);
        this.loading = false;
      }
    });
  }

  submitResponses(): void {
    const payload = {
      surveyId: this.surveyId,
      responses: Object.entries(this.answers).map(([questionId, answer]) => ({
        questionId: Number(questionId),
        answer
      }))
    };

    this.responseService.submitResponses(payload).subscribe({
      next: () => {
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/surveys/list']), 2000);
      },
      error: (err) => console.error('Error al enviar respuestas:', err)
    });
  }
}
