import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly PATH_CEP = '{numCep}/json/';
  constructor(
    private http: HttpClient
  ) { }

  buscarPorCep(cep: string): Observable<any> {
    return this.http.get(
        env.baseCEPUrl + this.PATH_CEP.replace('{numCep}', cep )
    );
  }
}
