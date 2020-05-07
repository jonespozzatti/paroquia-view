import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor (private roouter: Router) {}

  title = 'paroquia-view';

  ngOnInit() {
  }
  
  sair() {
    delete localStorage['token'];
    delete localStorage['paroquia'];
    this.roouter.navigate(['/']);
  }
  
  autenticado(): boolean {
    return localStorage['token'];
  }

}
