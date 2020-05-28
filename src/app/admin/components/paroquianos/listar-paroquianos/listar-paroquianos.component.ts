import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Membro, PastoralService, PessoapastoralService, Pastoral, ConfirmarDialog } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listar-paroquianos',
  templateUrl: './listar-paroquianos.component.html',
  styleUrls: ['./listar-paroquianos.component.css']
})
export class ListarParoquianosComponent implements OnInit {

  dataSource: MatTableDataSource<Membro>;
  colunas: string[] = ['nome', 'tipoParticipantePastoral', 'telefone', 'acao'];
  pastoralId: string;
  totalMembros: number;
  pastoral_nome: string;
  pastorais: Pastoral[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  
  constructor(
  	private pastoralService: PastoralService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pessoaPastoralService: PessoapastoralService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {
      this.route.params.subscribe(params => this.pastoralId = params['idPastoral']);
      this.route.params.subscribe(params => this.pastoral_nome = params['nomePastoral']);
     }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirMembros();
  }

  ordemPadrao() {
    this.ordem = 'id';
    this.direcao = 'DESC';
  }

  exibirMembros() {
    this.pessoaPastoralService.listarMembrosPorPastoralPaginado(
        this.pastoralId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalMembros = data['data'].totalElements;
          const membros = data['data'].content as Membro[];
          this.dataSource = new MatTableDataSource<Membro>(membros);
        },
        err => {
          const msg: string = "Erro obtendo membros da pastoral.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirMembros();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirMembros();
  }

  
  removerMembro(membro) { 
    
    const confirmDialog = this.dialog.open(ConfirmarDialog, {
      data: {
        
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir da Pastoral:',
        objeto: membro.nome
      }
    });
    
    confirmDialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(membro.id);
      }
    });
  }

  remover(membroId: string) {
    console.log(membroId);
  }

}
