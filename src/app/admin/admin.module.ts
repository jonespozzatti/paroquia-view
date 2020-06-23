import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './components/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { PastoralService, HttpUtilService, PessoapastoralService, PtBrMatPaginatorIntl } from '../shared';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CadastrarTurmaComponent, 
         ListarTurmasComponent, 
         CadastrarPastoralComponent, 
         CadastrarAvisoComponent, 
         ListarAvisosComponent, 
         ListarCursosComponent,
         CadastrarCursoComponent,
         ListarParoquianosComponent,
         ListarPastoraisComponent} from './components';




@NgModule({
  declarations: [ 
    MenuComponent, 
    DashboardComponent, 
    AdminComponent, 
    CadastrarPastoralComponent,  
    ListarCursosComponent, 
    ListarPastoraisComponent, 
    CadastrarCursoComponent, 
    CadastrarAvisoComponent, 
    ListarAvisosComponent,
    ListarParoquianosComponent,
    CadastrarTurmaComponent,
    ListarTurmasComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule, 
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSlideToggleModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    PastoralService,
    HttpUtilService,
    MatPaginatorIntl,
    PessoapastoralService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ]
})
export class AdminModule { }
