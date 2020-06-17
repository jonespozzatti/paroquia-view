import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pastoral, PastoralService, HttpUtilService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-pastoral',
  templateUrl: './cadastrar-pastoral.component.html',
  styleUrls: ['./cadastrar-pastoral.component.css']
})
export class CadastrarPastoralComponent implements OnInit {

  form: FormGroup;
  idPastoral: string; 
  pastoral: Pastoral;
  isButtonVisible: boolean =true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pastoralService: PastoralService,
    private snackBar: MatSnackBar,
    private httpUtilService: HttpUtilService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.idPastoral = params['idPastoral']);
     
    }

  ngOnInit(): void {
    this.gerarForm();
    if(this.idPastoral){
      this.obterPastoral();
      this.isButtonVisible= false;
      this.form.get('responsavel').clearValidators();
    }
  }
  obterPastoral(){
    this.pastoralService.obterPastoral(this.idPastoral)
      .subscribe(
        data => {
          this.pastoral = data['data'] as Pastoral;
          this.form.get('nome').setValue(this.pastoral['nome']);
          this.form.get('email').setValue(this.pastoral['email']);
          this.form.get('descricao').setValue(this.pastoral['descricao']); 
        },
        err => {
          const msg: string = "Erro obtendo pastoral.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  
  gerarForm() {
  	this.form = this.fb.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
  		descricao: ['', [Validators.required, Validators.minLength(6)]],
      responsavel: ['', [Validators.required]]
    });
  }

  cadastrar() {
  	if (this.form.invalid) {
      return;
    }
    const cadastroPastoral: Pastoral = this.prepararPastoral();
    this.pastoralService.cadastrar(cadastroPastoral)
      .subscribe(
        data => {
          const msg: string = "Pastoral cadastrada com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarPastorais']);
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
    const alterarPastoral: Pastoral = this.prepararAlterarPastoral();
    console.log(JSON.stringify(alterarPastoral));
    this.pastoralService.alterar(this.idPastoral, alterarPastoral)
      .subscribe(
        data => {
          const msg: string = "Pastoral alterada com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarPastorais']);
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

  prepararAlterarPastoral() {
    this.pastoral.nome=this.form.value.nome;
    this.pastoral.email=this.form.value.email;
    this.pastoral.descricao= this.form.value.descricao;
    return this.pastoral;
  }

  prepararPastoral() {
    return new Pastoral(
      this.form.value.nome,
      this.form.value.descricao,
      this.form.value.email,
      this.httpUtilService.obterIdParoquia(),
      this.form.value.responsavel);
  }

}
