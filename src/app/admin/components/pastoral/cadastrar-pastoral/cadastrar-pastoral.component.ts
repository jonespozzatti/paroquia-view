import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-pastoral',
  templateUrl: './cadastrar-pastoral.component.html',
  styleUrls: ['./cadastrar-pastoral.component.css']
})
export class CadastrarPastoralComponent implements OnInit {

  constructor(private roouter: Router) { }

  ngOnInit(): void {
  }

}
