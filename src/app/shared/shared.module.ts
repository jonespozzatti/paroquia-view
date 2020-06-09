import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { EnderecoService } from './services/endereco.service';
import { ConfirmarDialog } from './components';
import { MatButtonModule} from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CbPessoaComponent } from './components/cb-pessoa/cb-pessoa.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlterarMembroPastoralComponent } from './modals/alterar-membro-pastoral/alterar-membro-pastoral.component';




@NgModule({
  declarations: [
    MascaraDirective,
    ConfirmarDialog,
    CbPessoaComponent,
    AlterarMembroPastoralComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    MascaraDirective,
    CbPessoaComponent
    
  ],
  providers: [
    PtBrMatPaginatorIntl,
    EnderecoService
  ],
  entryComponents: [
    ConfirmarDialog
  ]
})
export class SharedModule { }
