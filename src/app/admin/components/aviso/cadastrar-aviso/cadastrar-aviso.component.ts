import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Noticia, HttpUtilService } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/shared/services/noticia.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-aviso',
  templateUrl: './cadastrar-aviso.component.html',
  styleUrls: ['./cadastrar-aviso.component.css']
})
export class CadastrarAvisoComponent implements OnInit {

  form: FormGroup;
  idNoticia: string; 
  noticia: Noticia;
  isButtonVisible: boolean =true;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noticiaService: NoticiaService,
    private snackBar: MatSnackBar,
    private httpUtilService: HttpUtilService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.idNoticia = params['idAviso']);     
    }
 
  ngOnInit(): void {
    this.gerarForm();
    if(this.idNoticia){
      this.obterNoticia();
      this.isButtonVisible= false;
    }
  }
  obterNoticia(){
    this.noticiaService.obterNoticia(this.idNoticia)
      .subscribe(
        data => {
          this.noticia = data['data'] as Noticia;
          this.form.get('nome').setValue(this.noticia['nome']);
          this.form.get('descricao').setValue(this.noticia['descricao']);
          this.form.get('dataApresentacao').setValue(this.noticia['dataApresentacao']);
          this.form.get('ativo').setValue(this.noticia['ativo']); 
        },
        err => {
          const msg: string = "Erro obtendo Noticia.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
  gerarForm() {
  	this.form = this.fb.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      dataApresentacao: ['', [Validators.required, Validators.minLength(6)]],
      ativo: ['']
    });
    this.form.get('ativo').setValue(true);
  }

  cadastrar() {
  	if (this.form.invalid) {
      return;
    }
    const cadastroNoticia: Noticia = this.prepararNoticia();
    this.noticiaService.cadastrar(cadastroNoticia)
      .subscribe(
        data => {
          const msg: string = "Noticia cadastrada com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarAvisos']);
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
    const alterarNoticia: Noticia = this.prepararAlterarNoticia();
    console.log(JSON.stringify(alterarNoticia));
    this.noticiaService.alterar(this.idNoticia, alterarNoticia)
      .subscribe(
        data => {
          const msg: string = "Noticia alterado com sucesso.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin/listarAvisos']);
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

  prepararAlterarNoticia() {
    this.noticia.nome=this.form.value.nome;
    this.noticia.descricao= this.form.value.descricao;
    this.noticia.dataApresentacao= this.form.value.dataApresentacao;
    this.noticia.ativo= this.form.value.ativo;
    return this.noticia;
  }

  prepararNoticia() {
    return new Noticia(
      this.form.value.nome,
      this.form.value.descricao,
      this.httpUtilService.obterIdParoquia(),
      this.form.value.ativo,
      this.form.value.dataApresentacao);
  }

}
