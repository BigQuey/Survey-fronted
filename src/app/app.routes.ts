import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ListComponent } from './surveys/list/list';
import { CreateComponent } from './surveys/create/create';
import { SurveyDetailComponent } from './surveys/detail/detail';
import { QuestionFormComponent } from './admin/question-form/question-form';
import { SurveyManagementComponent } from './admin/survey-management/survey-management';
import { DashboardHomeComponent } from './admin/dashboard-home/dashboard-home';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'surveys/list',
    component: ListComponent,
    // canActivate: [AuthGuard] // Protege para que solo usuarios logueados vean la lista
  },
  {
    path: 'surveys/detail/:id',
    component: SurveyDetailComponent,
    // canActivate: [AuthGuard] // Protege para que solo usuarios logueados respondan
  },
  {
    path: 'admin',
    component: AdminLayoutComponent, // 1. Este componente "padre" siempre se carga para /admin/*
    // canActivate: [AdminGuard],    // 2. Un solo Guard protege TODAS las rutas hijas
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'surveys', component: SurveyManagementComponent },
      { path: 'survey/:id/questions', component: QuestionFormComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
