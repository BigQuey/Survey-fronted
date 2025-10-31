import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasToken() && authService.getCurrentUserRole() === 'ROLE_ADMIN') {
    return true;
  }
  router.navigate(['/surveys/list']); 
  return false;
};
