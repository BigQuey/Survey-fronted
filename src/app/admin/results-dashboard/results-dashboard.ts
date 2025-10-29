import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../../core/services/survey';
import { ResponseService } from '../../core/services/response';

// Importaciones de Material y Charts
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-results-dashboard',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule,
    MatCardModule, MatProgressSpinnerModule, BaseChartDirective],
  templateUrl: './results-dashboard.html',
  styleUrl: './results-dashboard.css',
})
export class ResultsDashboardComponent {
  surveys: any[] = [];
  selectedSurveyId: number | null = null;
  stats: any = null;
  isLoadingSurveys = true;
  isLoadingStats = false;

  constructor(
    private surveyService: SurveyService,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    // Carga las encuestas para el selector al iniciar
    this.surveyService.getSurveys().subscribe({
      next: (res) => {
        this.surveys = res.data;
        this.isLoadingSurveys = false;
      },
      error: () => this.isLoadingSurveys = false
    });
  }

  onSurveySelect(surveyId: number): void {
    if (!surveyId) return;
    this.selectedSurveyId = surveyId;
    this.isLoadingStats = true;
    this.stats = null; // Limpia las estadísticas anteriores

    this.responseService.getSurveyStats(surveyId).subscribe({
      next: (res) => {
        // Procesamos los datos para que sean compatibles con Chart.js
        const processedStats = res.data;
        processedStats.questions.forEach((question: any) => {
          if (question.questionType === 'select' || question.questionType === 'radio') {
            // Transformamos el mapa de 'answerCounts' a un formato que ng2-charts entiende
            question.chartData = {
              labels: Object.keys(question.answerCounts),
              datasets: [{
                data: Object.values(question.answerCounts),
                label: 'Respuestas',
                backgroundColor: ['#3f51b5', '#ff4081', '#4caf50', '#ffc107', '#9c27b0', '#00bcd4'],
              }]
            };
            question.chartType = 'pie'; // Puedes usar 'bar', 'doughnut', etc.
          }
        });
        this.stats = processedStats;
        this.isLoadingStats = false;
      },
      error: (err) => {
        console.error("Error al cargar estadísticas", err);
        this.isLoadingStats = false;
      }
    });
  }
}
