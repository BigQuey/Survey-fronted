import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  loading = false;
  form: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.fb = this.fb || new FormBuilder();
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
     console.log('Formulario enviado', this.form.value);

  if (this.form.invalid) {
    console.warn('Formulario inválido', this.form.errors);
    return;
  }

  this.loading = true;
  this.authService.register(this.form.value).subscribe({
    next: () => {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.loading = false;
      console.error('Error al registrar:', err);
      alert('Error al registrarse. Inténtalo nuevamente.');
    },
  });
  }
}
