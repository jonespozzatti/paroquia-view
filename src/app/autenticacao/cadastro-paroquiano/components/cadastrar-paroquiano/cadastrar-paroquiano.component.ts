import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroParoquiano } from '../../models';
import { CpfValidator } from 'src/app/shared/validator';
import { Endereco, HttpUtilService } from 'src/app/shared';
import { CadastrarParoquianoService } from '../../services';
import { EnderecoService } from 'src/app/shared/services/endereco.service';


@Component({
  selector: 'app-cadastrar-paroquiano',
  templateUrl: './cadastrar-paroquiano.component.html',
  styleUrls: ['./cadastrar-paroquiano.component.css']
})
export class CadastrarParoquianoComponent implements OnInit {

  form: FormGroup;
  maxDate: Date;
  sexos: string[];
  selectedValue: string;
  paroquia_id: string;
  paroquia_nome: string;

  constructor(
  	private fb: FormBuilder, 
  	private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarParoquianoService: CadastrarParoquianoService,
    private enderecoService: EnderecoService,
    private httpUtilService: HttpUtilService
    
    ) {
      this.maxDate = new Date();
      this.paroquia_id = httpUtilService.obterIdParoquia();
      this.paroquia_nome = httpUtilService.obterNomeParoquia();
     }

  ngOnInit() {
    this.carregarListas();
    this.gerarForm();
  }

  gerarForm() {
  	this.form = this.fb.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, CpfValidator]],
      email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required, Validators.minLength(6)]],
      sexo: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      dataNasc: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.maxLength(6)]]
  	});
  }
  carregarListas(){
    this.cadastrarParoquianoService.listarSexos()
    .subscribe(
      data => {
        this.sexos=data['data'];
      }
    )
  
  }
  pesquisarCep() {
    console.log('------------' + this.form.get('cep').value +'---------');
    if(this.form.get('cep').value != ''){  
      this.enderecoService.buscarPorCep(this.form.get('cep').value)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          this.form.get('logradouro').setValue(data['logradouro']);
          this.form.get('bairro').setValue(data['bairro']);
          this.form.get('cidade').setValue(data['localidade']);
          this.form.get('uf').setValue(data['uf']);
        }
      )
    }
  }
  cadastrar() {
  	if (this.form.invalid) {
      return;
    }
    const cadastroParoquiano: CadastroParoquiano = this.prepararPessoa();
    this.cadastrarParoquianoService.cadastrar(cadastroParoquiano)
      .subscribe(
        data => {
          const msg: string = "Realize o login para acessar o sistema.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login/'+this.paroquia_id]);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            console.log(JSON.stringify(err));
            msg = err.error.errors.join(' ');
          }
          console.log(JSON.stringify(err));
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  	return false;
  }

  prepararPessoa() {
    let endereco = new Endereco(
      this.form.value.cep,
      this.form.value.logradouro,
      this.form.value.bairro,
      this.form.value.cidade,
      this.form.value.uf,
      this.form.value.numero);

    return new CadastroParoquiano(
      this.form.value.nome,
      this.form.value.email,
      this.form.value.senha,
      this.form.value.cpf,
      this.form.value.sexo,
      this.form.value.dataNasc,
      this.paroquia_id,
      endereco);
  }

}

