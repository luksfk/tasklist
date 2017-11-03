import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
    public token: string;
    public user;

    constructor(private router: Router) { }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.token = localStorage.getItem('eio.token');
        this.user = JSON.parse(localStorage.getItem('eio.user'));

        if (!this.token) {
            this.router.navigate(['/login'])
            return false;
        }

        return true;
    }
}