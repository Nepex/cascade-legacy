import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionStateService } from './api/index';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private sessionStateService: SessionStateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.sessionStateService.isAuthenticated()) {
            this.router.navigate(['/login'], {
                queryParams: {
                    redirect: state.url
                }
            });
            return;
        }

        return true;
    }
}