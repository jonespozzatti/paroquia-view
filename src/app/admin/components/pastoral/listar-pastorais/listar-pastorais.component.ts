import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HttpUtilService, Membro, PastoralService, PessoapastoralService, Pastoral } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-pastorais',
  templateUrl: './listar-pastorais.component.html',
  styleUrls: ['./listar-pastorais.component.css']
})
export class ListarPastoraisComponent implements OnInit {

  dataSource: MatTableDataSource<Membro>;
  colunas: string[] = ['nome', 'tipoParticipantePastoral', 'telefone', 'acao'];
  pastoralId: string;
  totalMembros: number;

  pastorais: Pastoral[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;
  
  constructor(
  	private pastoralService: PastoralService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pessoaPastoralService: PessoapastoralService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterPastorais();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      form_pastorais: ['', []]
    });
  }


  obterPastorais() {
    this.pastoralService.listarTodasPastorais()
      .subscribe(
        data => {
          this.pastorais = (data.data as Pastoral[]);
        },
        err => {
          const msg: string = "Erro obtendo pastorais.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  ordemPadrao() {
    this.ordem = 'id';
    this.direcao = 'DESC';
  }

  exibirMembros() {
    console.log("-------" + this.matSelect.selected['value']);
    if (this.matSelect.selected){
      this.pastoralId = this.matSelect.selected['value'];
    }else {
      return;
    }
    sessionStorage['pastoralId'] = this.pastoralId;
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

  removerMembro(membroId: string) {
    console.log(membroId);
  }

  removerDialog(membroId: string) {  
    console.log(membroId);
  }

}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">
        Não
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
