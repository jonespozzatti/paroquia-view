import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Curso, CursoService, HttpUtilService } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.component.html',
  styleUrls: ['./cadastrar-curso.component.css']
})
export class CadastrarCursoComponent implements OnInit {

  form: FormGroup;
  idCurso: string; 
  curso: Curso;
  isButtonVisible: boolean =true;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private httpUtilService: HttpUtilService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.idCurso = params['idCurso']);     
    }

  ngOnInit(): void {
    this.gerarForm();
    if(this.idCurso){
      this.obterCurso();
      this.isButtonVisible= false;
    }
  }
  obterCurso(){
    this.cursoService.obterCurso(this.idCurso)
      .subscribe(
        data => {
          this.curso = data['data'] as Curso;
          this.form.get('nome').setValue(this.curso['nome']);
          this.form.get('descricao').setValue(this.curso['descricao']); 
        },
        err => {
          const msg: string = "Erro obtendo Curso.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  
  gerarForm() {
  	this.form = this.fb.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
  		descricao: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrar() {
  	if (this.form.invalid) {
      return;
    }
    const cadastroCurso: Curso = this.prepararCurso();
    this.cursoService.cadastrar(cadastroCurso)
      .subscribe(
        data => {
          const msg: string = "Curso cadastrada com sucesso.";
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
    const alterarCurso: Curso = this.prepararAlterarCurso();
    console.log(JSON.stringify(alterarCurso));
    this.cursoService.alterar(this.idCurso, alterarCurso)
      .subscribe(
        data => {
          const msg: string = "Curso alterado com sucesso.";
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

  prepararAlterarCurso() {
    this.curso.nome=this.form.value.nome;
    this.curso.descricao= this.form.value.descricao;
    return this.curso;
  }

  prepararCurso() {
    return new Curso(
      this.form.value.nome,
      this.form.value.descricao,
      this.httpUtilService.obterIdParoquia());
  }

}
