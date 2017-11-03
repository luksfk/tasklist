import { Routes } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

export const rootRouterConfig: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthService]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];