import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);
  if(tokenService.getToken() != null){
    return true;
  }else{
    router.navigate(['/page-not-found']);
    return false;
  }
};

export const authAdminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);
  if(tokenService.getUser().admin != true){
    router.navigate(['/page-not-found']);
    return false;
  }else{
    return true;
  }
};
