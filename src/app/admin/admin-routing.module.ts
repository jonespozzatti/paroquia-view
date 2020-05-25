import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { MenuComponent, DashboardComponent, CadastrarPastoralComponent } from './components';
import { ListarPastoraisComponent } from './components/pastoral/listar-pastorais/listar-pastorais.component';
import { ListarCursosComponent } from './components/curso/listar-cursos/listar-cursos.component';
import { ListarAvisosComponent } from './components/aviso/listar-avisos/listar-avisos.component';
import { ListarParoquianosComponent } from './components/paroquianos/listar-paroquianos/listar-paroquianos.component';



export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
		  {path: '', component: DashboardComponent }, 
		  {path: 'dashboard', component: DashboardComponent }, 
		  {path: 'listarPastorais', component: ListarPastoraisComponent},
		  {path: 'listarCursos', component: ListarCursosComponent},
		  {path: 'listarAvisos', component: ListarAvisosComponent},
		  {path: 'listarMembros/:idPastoral/:nomePastoral', component: ListarParoquianosComponent}

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
