import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PastoralService, Pastoral } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-listar-pastorais',
  templateUrl: './listar-pastorais.component.html',
  styleUrls: ['./listar-pastorais.component.css']
})
export class ListarPastoraisComponent implements OnInit {

  dataSource: MatTableDataSource<Pastoral>;
  colunas: string[] = ['nome', 'descricao', 'email', 'acao'];
  pastoralId: string;
  totalPastorais: number;

  
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;
  
  constructor(
  	private pastoralService: PastoralService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterPastorais();
  }

  obterPastorais() {
    this.pastoralService.listarPastoraisPaginado(this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalPastorais = data['data'].totalElements;
          const pastorais = data['data'].content as Pastoral[];
          this.dataSource = new MatTableDataSource<Pastoral>(pastorais);
        },
        err => {
          const msg: string = "Erro obtendo pastorais.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  ordemPadrao() {
    this.ordem = 'nome';
    this.direcao = 'ASC';
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.obterPastorais();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.obterPastorais();
  }

  removerPastoral(membroId: string) {
    console.log(membroId);
  }

  removerDialog(membroId: string) {  
    console.log(membroId);
  }

}
