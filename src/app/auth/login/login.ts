import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  loading = false;
  form: any;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.fb = this.fb ||new FormBuilder();
    this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  }

  onSubmit(): void {
  if (this.form.invalid) return;

  this.loading = true;
  
  this.authService.login(this.form.value).subscribe({
    next: (data) => {
      this.loading = false;
      const role = data.role;

      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/home']);
      } else if (role === 'ROLE_USUARIO') {
        this.router.navigate(['/surveys/list']);
      } else {
        console.error(role);
        console.error('Rol desconocido');
        this.router.navigate(['/']);
      }
    },
    error: (err) => {
      this.loading = false;
      console.error(err);
      alert('Credenciales inválidas');
    },
  });

  }
}
