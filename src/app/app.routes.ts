import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ListComponent } from './surveys/list/list';
import { CreateComponent } from './surveys/create/create';
import { SurveyDetailComponent } from './surveys/detail/detail';
import { QuestionFormComponent } from './admin/question-form/question-form';

export const routes: Routes = [
  { path: 'admin/survey/:id/questions', component: QuestionFormComponent }, // Protege esta ruta con un Guard de Admin
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'surveys/list', component: ListComponent },
  { path: 'surveys/create', component: CreateComponent },
  { path: 'surveys/detail/:id', component: SurveyDetailComponent },
];
