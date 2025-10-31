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
import { UserManagementComponent } from './admin/user-management/user-management';
import { ResultsDashboardComponent } from './admin/results-dashboard/results-dashboard';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { NotFoundComponent } from './shared/not-found/not-found';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'surveys/list',
    component: ListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'surveys/detail/:id',
    component: SurveyDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'surveys', component: SurveyManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'results', component: ResultsDashboardComponent },
      { path: 'survey/:id/questions', component: QuestionFormComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent } 
];