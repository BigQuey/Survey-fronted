import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-survey-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './survey-dialog.html',
  styleUrl: './survey-dialog.css',
})
export class SurveyDialogComponent {
surveyForm: FormGroup;
  isEditMode: boolean;

  constructor(
    // MatDialogRef es la referencia al diálogo que acabamos de abrir
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    // MAT_DIALOG_DATA es para recibir datos del componente padre
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data; // Si hay datos, estamos en modo edición
    this.surveyForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required]
    });
  }

  onCancel(): void {
    // Cierra el diálogo sin enviar datos
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.surveyForm.valid) {
      // Cierra el diálogo y devuelve los datos del formulario
      this.dialogRef.close(this.surveyForm.value);
    }
  }
}
