import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Turma } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private readonly PATH: string = 'turma';
  private readonly PATH_TURMAS_PAG = '/curso/pag/{cursoId}';
  

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }
 
  listarTurmasPaginado(
    pagina: number,
    ordem: string,
    direcao: string,
    cursoId: string): Observable<any> {
      const url: string = env.baseApiUrl + this.PATH +
      this.PATH_TURMAS_PAG.replace('{cursoId}', cursoId);
      const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
      return this.http.get(url + params, this.httpUtil.headers());
  }

  obterTurma(turmaId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + '/' + turmaId,
      this.httpUtil.headers()
    );
  }

  remover(turmaId: string) : Observable<any> {
    return this.http.delete(
      env.baseApiUrl + this.PATH + '/' + turmaId,
      this.httpUtil.headers()
    );
  }

  cadastrar(cadastroTurma: Turma): Observable<any> {
    return this.http.post(
      env.baseApiUrl + this.PATH, cadastroTurma,
      this.httpUtil.headers()
    );
  }

  alterar(id: string, alterarTurma: Turma): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + id, alterarTurma,
      this.httpUtil.headers()
    );
  }
}
