import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { MenuComponent } from './components';



export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
		  {
			path: '', 
			component: MenuComponent
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
