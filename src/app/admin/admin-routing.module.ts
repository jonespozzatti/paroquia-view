import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { MenuComponent, DashboardComponent, CadastrarPastoralComponent, ListarTurmasComponent } from './components';
import { ListarPastoraisComponent } from './components/pastoral/listar-pastorais/listar-pastorais.component';
import { ListarCursosComponent } from './components/curso/listar-cursos/listar-cursos.component';
import { ListarAvisosComponent } from './components/aviso/listar-avisos/listar-avisos.component';
import { ListarParoquianosComponent } from './components/paroquianos/listar-paroquianos/listar-paroquianos.component';
import { CadastrarCursoComponent } from './components/curso/cadastrar-curso/cadastrar-curso.component';
import { CadastrarAvisoComponent } from './components/aviso/cadastrar-aviso/cadastrar-aviso.component';



export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
		  {path: '', component: DashboardComponent }, 
		  {path: 'dashboard', component: DashboardComponent }, 
		  {path: 'listarPastorais', component: ListarPastoraisComponent},
		  {path: 'cadastrarPastoral', component: CadastrarPastoralComponent},
		  {path: 'cadastrarPastoral/:idPastoral', component: CadastrarPastoralComponent},
		  {path: 'listarCursos', component: ListarCursosComponent},
		  {path: 'cadastrarCurso', component: CadastrarCursoComponent},
		  {path: 'cadastrarCurso/:idCurso', component: CadastrarCursoComponent},
		  {path: 'listarAvisos', component: ListarAvisosComponent},
		  {path: 'cadastrarAviso', component: CadastrarAvisoComponent},
		  {path: 'cadastrarAviso/:idAviso', component: CadastrarAvisoComponent},
		  {path: 'listarMembros/:idPastoral/:nomePastoral', component: ListarParoquianosComponent},
		  {path: 'listarTurmas/:idCurso/:nomeCurso', component: ListarTurmasComponent}
		  

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
