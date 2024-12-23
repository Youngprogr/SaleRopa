import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn:'root'
})
export class AutorizarLogeadoGuard {
  constructor (private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
   MaybeAsync<GuardResult>
  {
    const isLoggedIn = this.userService.hayUsuarioLogueado();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }   
  } 
}