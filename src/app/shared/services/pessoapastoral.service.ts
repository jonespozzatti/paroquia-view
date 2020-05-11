import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoapastoralService {

  private readonly PATH: string = 'pessoapastoral';
  private readonly PATH_MEMBROS_POR_PASTORAL = '/pastoral/{pastoralId}';
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
      console.log(url);
      return this.http.get(url + params, this.httpUtil.headers());

  }
}
