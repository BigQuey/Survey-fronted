import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../core/services/survey';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  surveys: any[] = [];
  loading = true;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getMySurveyList().subscribe({
      next: (res) => {
        this.surveys = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar encuestas:', err);
        this.loading = false;
      }
    });
  }

   goToDetail(id: number): void {
     this.router.navigate(['/surveys/detail', id]);
   }
  goToSurvey(survey: any): void {
    if (survey.completedByUser) {
      // Si está completada, navega al detalle en modo "ver"
      this.router.navigate(['/surveys/detail', survey.id], { queryParams: { mode: 'view' } });
    } else {
      // Si no, navega al detalle en modo "responder" (normal)
      this.router.navigate(['/surveys/detail', survey.id]);
    }
  }
}
