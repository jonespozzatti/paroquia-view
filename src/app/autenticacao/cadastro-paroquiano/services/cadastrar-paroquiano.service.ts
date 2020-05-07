import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroParoquiano } from '../models';
import { Observable } from 'rxjs';
import { environment as env} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CadastrarParoquianoService {

  private readonly PATH: string ='pessoa';

  constructor(private hhtp: HttpClient) { }

  cadastrar(cadastroParoquiano: CadastroParoquiano): Observable<any> {
    return this.hhtp.post(env.baseApiUrl + this.PATH, cadastroParoquiano);
  }

  listarSexos(): Observable<any>  {
    return this.hhtp.get<Array<string>>(env.baseApiUrl + this.PATH+'/sexo', {});
  }
}
