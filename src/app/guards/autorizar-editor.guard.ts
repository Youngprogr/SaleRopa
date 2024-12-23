import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn:'root'
})
export class AutorizarEditorGuard {
  constructor (private userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
   MaybeAsync<GuardResult>
  {
    let permisos = this.userService.getAuthoritiesActual();
    if (permisos) {
      if (permisos.indexOf("ROLE_ADMIN")>=0) {
        return true;
      }
    }
    return false;
  }
}