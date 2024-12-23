import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn:'root'
})
export class AutorizarConsultaGuard {

  constructor (private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
   MaybeAsync<GuardResult>
// boolean | UrlTree | RedirectCommand | Observable<boolean | UrlTree | RedirectCommand> | Promise<boolean | UrlTree | RedirectCommand>
  {
    let permisos = this.userService.getAuthoritiesActual();
    if (permisos) {
      if (permisos.indexOf("ROLE_USER")>=0) {
        return true;
      }
    }
    return false;
  }


}


/*
import { CanActivateFn } from '@angular/router';
export const autorizarConsultaGuard: CanActivateFn = (route, state) => {
  return true;
};
*/