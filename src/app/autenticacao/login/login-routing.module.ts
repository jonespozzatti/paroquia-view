import { Routes, RouterModule } from '@angular/router';
import { LogarComponent, LoginComponent } from './components';
import { NgModule } from '@angular/core';


export const LoginRoutes: Routes = [
    {
        path: 'login/:id',
        component: LogarComponent,
        children: [{path: '', component: LoginComponent}]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes)],
    exports: [ RouterModule]
})

export class LoginRoutingModule {
}

