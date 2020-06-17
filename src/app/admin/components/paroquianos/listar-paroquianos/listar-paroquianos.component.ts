import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Membro, PastoralService, PessoapastoralService, Pastoral, ConfirmarDialog, PessoaPastoral, AlterarMembroPastoralComponent } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


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

  tipoParticipantePastoral: string;
  nome: string;
  telefone: string;
  funcoes: string[];
   
  constructor(
  	private pastoralService: PastoralService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pessoaPastoralService: PessoapastoralService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public dialogAlterar: MatDialog,
    @Inject(DOCUMENT) private document: Document
    ) {
      this.route.params.subscribe(params => this.pastoralId = params['idPastoral']);
      this.route.params.subscribe(params => this.pastoral_nome = params['nomePastoral']);
     }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirMembros();
    this.form = this.fb.group({
      pessoa:['',Validators.required]
    });
    this.carregarFuncoes();
  }

  openDialog(membro: Membro): void {
   
    const dialogRef = this.dialog.open(AlterarMembroPastoralComponent, {
      width: '250px',
      data: {
        nome:membro.nome, 
        tipoParticipantePastoral:membro.tipoParticipantePastoral, 
        telefone:membro.telefone,
        funcoes: this.funcoes
      }
    });
   
    dialogRef.afterClosed().subscribe(alterar => {
      if (alterar) {
        alert(JSON.stringify(alterar));
        this.alterar_funcao(membro, alterar);
      }
    });
  }

  alterar_funcao(membro: Membro, alterar: any) {
    var pastoralID: number = +membro.pastoralId;
      var pessoaID: number = +membro.pessoaId;
      const pessoaPastoral= new PessoaPastoral( pastoralID ,pessoaID,alterar.tipoParticipantePastoral,membro.id);
      this.pessoaPastoralService.alterarPessoa_Pastoral(membro.id, pessoaPastoral)
      .subscribe(
        data => {
          const msg: string = "Função da pessoa alterada com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.onReload();
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

  carregarFuncoes(){
    this.pessoaPastoralService.listarFuncoes()
    .subscribe(
      data => {
        this.funcoes=data['data'];
      }
    )
  
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
    this.pessoaPastoralService.remover(membroId)
      .subscribe(
        data => {
          const msg: string = "Membro da pastoral removido com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.onReload();
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

  adicionarMembroPastoral() {
    if (this.form.invalid) { return;  }

    var y: number = +this.pastoralId;
    const pessoaPastoral= new PessoaPastoral( y ,this.form.get('pessoa').value,"INTEGRANTE",null);
    this.pessoaPastoralService.incluirPessoa_Pastoral(pessoaPastoral)
      .subscribe(
        data => {
          const msg: string = "Pessoa icluída a pastoral com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.onReload();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
      return false;
  }

  onReload(){
    this.document.location.reload(); 
   }

}
