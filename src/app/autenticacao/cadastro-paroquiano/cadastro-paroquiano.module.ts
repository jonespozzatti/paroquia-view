import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CadastrarParoquianoComponent, CadastroParoquianoComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CadastrarParoquianoService } from './services';
import {NgxMaskModule} from "ngx-mask";
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    CadastrarParoquianoComponent,
    CadastroParoquianoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    SharedModule,
    MatToolbarModule,
    NgxMaskModule.forRoot()
  
  ],
  providers: [
    CadastrarParoquianoService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroParoquianoModule { }
