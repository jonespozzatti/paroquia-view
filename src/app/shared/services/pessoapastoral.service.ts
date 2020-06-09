import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { PessoaPastoral } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PessoapastoralService {

  private readonly PATH: string = 'pessoapastoral';
  private readonly PATH_MEMBROS_POR_PASTORAL = '/pastoral/{pastoralId}';
  private readonly PATH_NAO_MEMBROS_DA_PASTORAL = '/naopastoral/{pastoralId}';
  private readonly PATH_MEMBROS_POR_PASTORAL_PAG = '/pastoral/pag/{pastoralId}';
  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }

  listarTodosMembrosPorPastoral(
    pastoralId: string): Observable<any> {
  	return this.http.get(
  	  	env.baseApiUrl + this.PATH + 
  	  		this.PATH_MEMBROS_POR_PASTORAL.replace(
  	  			'{pastoralId}', pastoralId),
  	  	this.httpUtil.headers()
  	);
  }
  listarMembrosPorPastoralPaginado(
    pastoralId: string,
    pagina: number,
    ordem: string,
    direcao:string) : Observable<any> {

      const url: string = env.baseApiUrl + this.PATH +
      this.PATH_MEMBROS_POR_PASTORAL_PAG.replace('{pastoralId}', pastoralId);

      const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
      return this.http.get(url + params, this.httpUtil.headers());

  }

  listarPessoasNaoPertecemPastoralID(
    pastoralId: string) : Observable<any> {

      return this.http.get(
  	  	env.baseApiUrl + this.PATH + 
  	  		this.PATH_NAO_MEMBROS_DA_PASTORAL.replace(
  	  			'{pastoralId}', pastoralId),
  	  	this.httpUtil.headers()
  	);

  }
  
  incluirPessoa_Pastoral(pessoaPastoral: PessoaPastoral): Observable<any> {
    return this.http.post(
        env.baseApiUrl + this.PATH, pessoaPastoral,
        this.httpUtil.headers()
    );
  }

  remover(membroId: string) : Observable<any> {
    return this.http.delete(
      env.baseApiUrl + this.PATH + '/' + membroId,
      this.httpUtil.headers()
    );
  }
}
