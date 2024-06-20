import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const isTenantGuard: CanActivateFn = (route, state) => {
    let authService = inject(AuthenticationService);
    let router = inject(Router);
    if(authService.user.value.role !='tenant') {
      router.navigateByUrl('/home');
      return false;
    }
  return true;
};
