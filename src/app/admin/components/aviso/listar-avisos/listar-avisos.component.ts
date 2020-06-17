import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ConfirmarDialog, Noticia } from 'src/app/shared';
import { NoticiaService } from 'src/app/shared/services/noticia.service';

@Component({
  selector: 'app-listar-avisos',
  templateUrl: './listar-avisos.component.html',
  styleUrls: ['./listar-avisos.component.css']
})
export class ListarAvisosComponent implements OnInit {


  dataSource: MatTableDataSource<Noticia>;
  colunas: string[] = ['nome', 'dataApresentacao', 'ativo', 'acao'];
  noticiaId: string;
  totalNoticias: number;

  @ViewChild(MatSelect) matSelect: MatSelect;
  
  private pagina: number;
  private ordem: string;
  private direcao: string;
  constructor(
    private noticiaService: NoticiaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterNoticias();
  }

  obterNoticias() {
    this.noticiaService.listarNoticiasPaginado(this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalNoticias = data['data'].totalElements;
          const noticias = data['data'].content as Noticia[];
          this.dataSource = new MatTableDataSource<Noticia>(noticias);
        },
        err => {
          let msg: string = "Erro obtendo noticias.";
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
    this.obterNoticias();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.obterNoticias();
  }

  removerNoticia(noticia) { 
    const confirmDialog = this.dialog.open(ConfirmarDialog, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir a Noticia:',
        objeto: noticia.nome
      }
    });
    confirmDialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(noticia.id);
      }
    });
  }
  remover(noticiaId: string) {
    this.noticiaService.remover(noticiaId)
      .subscribe(
        data => {
          const msg: string = "Noticia removida com sucesso!";
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
