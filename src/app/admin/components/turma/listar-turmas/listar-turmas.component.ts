import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Turma, ConfirmarDialog } from 'src/app/shared';
import { MatSelect } from '@angular/material/select';
import { TurmaService } from 'src/app/shared/services/turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-turmas',
  templateUrl: './listar-turmas.component.html',
  styleUrls: ['./listar-turmas.component.css']
})
export class ListarTurmasComponent implements OnInit {

  dataSource: MatTableDataSource<Turma>;
  colunas: string[] = ['descricao', 'dataInicio', 'dataFim', 'acao'];
  cursoId: string;
  totalTurmas: number;
  nome_curso: string;

  @ViewChild(MatSelect) matSelect: MatSelect;
  
  private pagina: number;
  private ordem: string;
  private direcao: string;
  
  constructor(
    private turmaService: TurmaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
      this.route.params.subscribe(params => this.cursoId = params['idCurso']);
      this.route.params.subscribe(params => this.nome_curso = params['nomeCurso']);
   }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterTurmas();
  }

  obterTurmas() {
    this.turmaService.listarTurmasPaginado(this.pagina, this.ordem, this.direcao, this.cursoId)
      .subscribe(
        data => {
          this.totalTurmas = data['data'].totalElements;
          const turmas = data['data'].content as Turma[];
          this.dataSource = new MatTableDataSource<Turma>(turmas);
        },
        err => {
          let msg: string = "Erro obtendo turmas.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  ordemPadrao() {
    this.ordem = 'descricao';
    this.direcao = 'ASC';
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.obterTurmas();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.obterTurmas();
  }

  removerCurso(turma) { 
    const confirmDialog = this.dialog.open(ConfirmarDialog, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir a Turma:',
        objeto: turma.descricao
      }
    });
    confirmDialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(turma.id);
      }
    });
  }
  remover(turmaId: string) {
    this.turmaService.remover(turmaId)
    .subscribe(
      data => {
        const msg: string = "Turma removido com sucesso!";
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
