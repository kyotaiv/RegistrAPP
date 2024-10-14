import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Obtener el servicio de autenticación
  const router = inject(Router);  // Obtener el router

  return authService.isLoggedIn().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
