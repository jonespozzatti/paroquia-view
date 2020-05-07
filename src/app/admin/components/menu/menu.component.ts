import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpUtilService } from 'src/app/shared';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  paroquia_id: string;
  paroquia_nome: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roouter: Router,
    private httpUtilService: HttpUtilService
    ) {
      this.paroquia_id = httpUtilService.obterIdParoquia();
      this.paroquia_nome = httpUtilService.obterNomeParoquia();
    }

  sair() {
    delete localStorage['token'];
    delete localStorage['paroquia'];
    this.roouter.navigate(['/login/' + this.paroquia_id]);
  }
  
  autenticado(): boolean {
    return localStorage['token'];
  }

}
