import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { NoticiaService } from 'src/app/shared/services/noticia.service';
import { Card } from 'src/app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cartoes: Card[];
 
  constructor(private breakpointObserver: BreakpointObserver,
    private noticiaService: NoticiaService) {
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(
        dataBreak => {  
            this.noticiaService.listarCards(dataBreak['matches'])
            .subscribe(
              data => {
                this.cartoes = data['data'] as Card[];
              }
            );
        })
    }
}
