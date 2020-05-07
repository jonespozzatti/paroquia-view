import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	CadastroParoquianoComponent, CadastrarParoquianoComponent
} from './components';

export const CadastroParoquianoRoutes: Routes = [
	{
		path: 'cadastro-paroquiano',
		component: CadastroParoquianoComponent,
		children: [
		  {
			path: '', 
			component: CadastrarParoquianoComponent
		  }
		]
	}
];

@NgModule({
  imports: [
  	RouterModule.forChild(CadastroParoquianoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CadastroParoquianoRoutingModule {
}

