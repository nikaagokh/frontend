import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.adminGuard().pipe(
    map((val) => {
      if(val) {
        return true;
      } else {
        router.navigate(['/'])
        return false;
      }
    })
    
  )
};
