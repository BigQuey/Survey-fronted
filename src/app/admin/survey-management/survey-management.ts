import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../core/services/survey';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SurveyDialogComponent } from '../survey-dialog/survey-dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-survey-management',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './survey-management.html',
  styleUrl: './survey-management.css',
})
export class SurveyManagementComponent implements OnInit {
  surveys: any[] = [];
  isLoading = true;
  // Define las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    public dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.isLoading = true;
    this.surveyService.getSurveys().subscribe({
      next: (res) => {
        this.surveys = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar encuestas', err);
        this.isLoading = false;
      }
    });
  }

  openDialog(survey?: any): void {
    const dialogRef = this.dialog.open(SurveyDialogComponent, {
      width: '500px',
      data: survey // Pasa la encuesta si estamos editando, o null/undefined si estamos creando
    });

    dialogRef.afterClosed().subscribe(result => {
      // 'result' contiene los datos del formulario si se guardó
      if (result) {
        if (survey) {
          // Lógica de Actualización
          this.surveyService.updateSurvey(survey.id, result).subscribe(() => this.loadSurveys());
        } else {
          // Lógica de Creación
          this.surveyService.createSurvey(result).subscribe(() => this.loadSurveys());
        }
      }
    });
  }

  deleteSurvey(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
      this.surveyService.deleteSurvey(id).subscribe(() => {
        this.surveys = this.surveys.filter(s => s.id !== id);
      });
    }
  }

  manageQuestions(id: number): void {
    this.router.navigate(['/admin/survey', id, 'questions']);
  }
}