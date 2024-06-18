import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);
    let router = inject(Router);
    if(authService.user.value.role !='admin') {
      router.navigateByUrl('/home');
      return false;
    }
  return true;
};
