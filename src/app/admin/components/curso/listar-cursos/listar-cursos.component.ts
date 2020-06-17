import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ConfirmarDialog, Curso } from 'src/app/shared';
import { CursoService } from 'src/app/shared/services/curso.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  dataSource: MatTableDataSource<Curso>;
  colunas: string[] = ['nome', 'descricao', 'acao'];
  cursoId: string;
  totalCursos: number;

  @ViewChild(MatSelect) matSelect: MatSelect;
  
  private pagina: number;
  private ordem: string;
  private direcao: string;
  
  constructor(
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterCursos();
  }

  obterCursos() {
    this.cursoService.listarCursosPaginado(this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalCursos = data['data'].totalElements;
          const cursos = data['data'].content as Curso[];
          this.dataSource = new MatTableDataSource<Curso>(cursos);
        },
        err => {
          let msg: string = "Erro obtendo cursos.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
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
    this.obterCursos();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.obterCursos();
  }

  removerCurso(curso) { 
    const confirmDialog = this.dialog.open(ConfirmarDialog, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir o Curso:',
        objeto: curso.nome
      }
    });
    confirmDialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(curso.id);
      }
    });
  }
  remover(cursoId: string) {
    this.cursoService.remover(cursoId)
      .subscribe(
        data => {
          const msg: string = "Curso removido com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.ngOnInit();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
