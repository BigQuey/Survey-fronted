import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken()) {
    const role = authService.getCurrentUserRole();
    if (role === 'USER_ADMIN') {
      router.navigate(['/admin/home']);
    } else {
      router.navigate(['/surveys/list']);
    }
    return false;
  }
  return true;
};
