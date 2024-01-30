import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let isLogin = false
  const router = Inject(Router)
  const auth = Inject(AuthService)
  auth.isLogin$?.subscribe((login: boolean) => {
    isLogin = login
  })

  if (isLogin){
    return true
  } else{
    router.navigate(['/login'])
    return false
  }
}
