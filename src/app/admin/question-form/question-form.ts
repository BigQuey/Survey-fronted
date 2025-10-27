import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../core/services/question';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question-form.html',
  styleUrl: './question-form.css',
})
export class QuestionFormComponent implements OnInit{
surveyId!: number;
  questionForm: FormGroup;
  existingQuestions: any[] = [];
  questionTypes = ['text', 'select', 'radio']; // Tipos de pregunta que soportas
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {
    // Inicializa el formulario con su estructura
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      type: ['text', Validators.required],
      // 'options' es un FormArray porque puede tener un número variable de campos
      options: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Obtiene el ID de la encuesta desde la URL
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadExistingQuestions();

    // Escucha los cambios en el tipo de pregunta para añadir/quitar opciones
    this.questionForm.get('type')?.valueChanges.subscribe(type => {
      this.handleOptions(type);
    });
  }

  // Carga las preguntas que ya existen para esta encuesta
  loadExistingQuestions(): void {
    this.isLoading = true;
    this.questionService.getQuestionsForSurvey(this.surveyId).subscribe({
      next: (res) => {
        this.existingQuestions = res.data; // Ajusta según la estructura de tu API
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando las preguntas existentes", err);
        this.isLoading = false;
      }
    });
  }

  // Getter para acceder fácilmente al FormArray de opciones desde el template
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  // Añade un nuevo campo de opción al FormArray
  addOption(): void {
    this.options.push(this.fb.control('', Validators.required));
  }

  // Elimina una opción por su índice
  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  // Lógica para gestionar las opciones según el tipo de pregunta
  handleOptions(type: string): void {
    if (type === 'select' || type === 'radio') {
      // Si no hay opciones, añade dos por defecto
      if (this.options.length === 0) {
        this.addOption();
        this.addOption();
      }
    } else {
      // Si el tipo es 'text', vacía el array de opciones
      this.options.clear();
    }
  }

  // Envía el formulario para crear la nueva pregunta
  onSubmit(): void {
    if (this.questionForm.invalid) {
      return; // Si el formulario no es válido, no hagas nada
    }

    const formValue = this.questionForm.value;
    const payload = {
      surveyId: this.surveyId,
      text: formValue.text,
      type: formValue.type,
      // Solo envía las opciones si el tipo lo requiere
      options: (formValue.type === 'select' || formValue.type === 'radio') ? formValue.options : null
    };

    this.questionService.createQuestion(payload).subscribe({
      next: () => {
        alert('¡Pregunta creada con éxito!');
        this.loadExistingQuestions(); // Recarga la lista de preguntas
        this.questionForm.reset({ type: 'text' }); // Resetea el formulario
        this.options.clear();
      },
      error: (err) => {
        console.error("Error al crear la pregunta", err);
        alert('Hubo un error al crear la pregunta.');
      }
    });
  }
}
