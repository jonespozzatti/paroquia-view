import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpUtilService, Turma } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from 'src/app/shared/services/turma.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-turma',
  templateUrl: './cadastrar-turma.component.html',
  styleUrls: ['./cadastrar-turma.component.css']
})
export class CadastrarTurmaComponent implements OnInit {

  form: FormGroup;
  idCurso: string;
  idTurma: string; 
  turma: Turma;
  isButtonVisible: boolean =true;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private turmaService: TurmaService,
    private snackBar: MatSnackBar,
    private httpUtilService: HttpUtilService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.idTurma = params['idTurma']);     
    }

  ngOnInit(): void {
    this.gerarForm();
    if(this.idTurma){
      this.obterTurma();
      this.isButtonVisible= false;
    }
  }
  obterTurma(){
    this.turmaService.obterTurma(this.idTurma)
      .subscribe(
        data => {
          this.turma = data['data'] as Turma;
          this.form.get('descricao').setValue(this.turma['descricao']); 
        },
        err => {
          const msg: string = "Erro obtendo Turma.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  
  gerarForm() {
  	this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      diaSemana: ['',[Validators.required]],
      horarios: ['',[Validators.required]],
      dataInicio: ['',[Validators.required]],
      dataFim: ['',[Validators.required]],
      professorId: ['',[Validators.required]]
    });
  }

  cadastrar() {
  	if (this.form.invalid) {
      return;
    }
    const cadastroTurma: Turma = this.prepararTurma();
    this.turmaService.cadastrar(cadastroTurma)
      .subscribe(
        data => {
          const msg: string = "Turma cadastrada com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarCursos']);
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

  alterar() {
  	if (this.form.invalid) {
      return;
    }
    const alterarTurma: Turma = this.prepararAlterarTurma();
    console.log(JSON.stringify(alterarTurma));
    this.turmaService.alterar(this.idTurma, alterarTurma)
      .subscribe(
        data => {
          const msg: string = "Turma alterado com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarCursos']);
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

  prepararAlterarTurma() {
    
    this.turma.descricao= this.form.value.descricao;
    return this.turma;
  }

  prepararTurma() {
    return new Turma(
      this.form.value.descricao,
      this.form.value.diaSemana,
      this.form.value.horarios,
      this.form.value.dataInicio,
      this.form.value.dataFim,
      this.idCurso,
      this.form.value.professorId);
  }

}
