import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../../models';
import { LoginService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  paroquia_id: string;
  paroquia_nome: string;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { 
    this.route.params.subscribe(params => this.paroquia_id = params['id']);
    this.loginService.obterParoquia(this.paroquia_id)
      .subscribe(
        data => {
          localStorage['paroquia'] = JSON.stringify(data['data']);
          this.paroquia_nome = data['data']['descricao'];
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err['status'] == 401) {
            msg = "Paróquia não encotrada."
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  ngOnInit(): void {
    console.log(this.paroquia_id);
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if (this.form.invalid) {
      return;
    }

    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe(
        data => {
          localStorage['token'] = data['data']['token'];
          const usuarioData = JSON.parse(
            atob(data['data']['token'].split('.')[1]));
          console.log(JSON.stringify(usuarioData));
          if (usuarioData['role'] == 'ROLE_ADMIN') {
            alert('Deve redicionar para pagina admin');
          	this.router.navigate(['/admin']);
          } else {
            alert('Deve redicionar para pagina funcionario');
          	this.router.navigate(['/admin']);
          }
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err['status'] == 401) {
            msg = "CPF/senha inválido(s)."
          }else if(err['error'] != null)
            msg = err['error'].errors;
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
}
