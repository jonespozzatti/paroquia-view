import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pastoral } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PastoralService {

  private readonly PATH: string = 'pastoral';
  private readonly PATH_PASTORAIS_PAG = '/paroquia/pag/{paroquiaId}';
  private readonly PATH_PASTORAIS = '/paroquia/{paroquiaId}';

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }

  listarTodasPastorais(): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH +
      this.PATH_PASTORAIS.replace(
        '{paroquiaId}', this.httpUtil.obterIdParoquia()),
        this.httpUtil.headers()
    );
  }

  obterPastoral(pastoralId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + '/' + pastoralId,
      this.httpUtil.headers()
    );
  }

listarPastoraisPaginado(
    pagina: number,
    ordem: string,
    direcao:string): Observable<any> {
      const url: string = env.baseApiUrl + this.PATH +
      this.PATH_PASTORAIS_PAG.replace('{paroquiaId}', this.httpUtil.obterIdParoquia());
      const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
      return this.http.get(url + params, this.httpUtil.headers());
  }

  remover(pastoralId: string) : Observable<any> {
    return this.http.delete(
      env.baseApiUrl + this.PATH + '/' + pastoralId,
      this.httpUtil.headers()
    );
  }
  cadastrar(cadastroPastoral: Pastoral): Observable<any> {
    return this.http.post(
      env.baseApiUrl + this.PATH, cadastroPastoral,
      this.httpUtil.headers()
    );
  }

  alterar(id: string, alterarPastoral: Pastoral): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + id, alterarPastoral,
      this.httpUtil.headers()
    );
  }
}
