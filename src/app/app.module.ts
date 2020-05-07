import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule, LoginRoutingModule, CadastroParoquianoModule, CadastroParoquianoRoutingModule } from './autenticacao';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminModule, AdminRoutingModule} from './admin';
import { HttpUtilService } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    LoginRoutingModule,
    CadastroParoquianoModule,
    CadastroParoquianoRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    AdminModule,
    AdminRoutingModule,


    AppRoutingModule
  ],
  providers: [
    HttpUtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
