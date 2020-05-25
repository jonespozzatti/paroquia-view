import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { EnderecoService } from './services/endereco.service';
import { ConfirmarDialog } from './components';
import { MatButtonModule} from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    MascaraDirective,
    ConfirmarDialog
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MascaraDirective
    
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
