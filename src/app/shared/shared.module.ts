import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { EnderecoService } from './services/endereco.service';




@NgModule({
  declarations: [
    MascaraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective
  ],
  providers: [
    PtBrMatPaginatorIntl,
    EnderecoService
  ]
})
export class SharedModule { }
