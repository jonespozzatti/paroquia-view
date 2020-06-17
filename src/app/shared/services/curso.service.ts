import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Curso } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly PATH: string = 'curso';
  private readonly PATH_CURSOS_PAG = '/paroquia/pag/{paroquiaId}';
  

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }
 
  listarCursosPaginado(
    pagina: number,
    ordem: string,
    direcao:string): Observable<any> {
      const url: string = env.baseApiUrl + this.PATH +
      this.PATH_CURSOS_PAG.replace('{paroquiaId}', this.httpUtil.obterIdParoquia());
      const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
      return this.http.get(url + params, this.httpUtil.headers());
  }

  obterCurso(cursoId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + '/' + cursoId,
      this.httpUtil.headers()
    );
  }

  remover(cursoId: string) : Observable<any> {
    return this.http.delete(
      env.baseApiUrl + this.PATH + '/' + cursoId,
      this.httpUtil.headers()
    );
  }

  cadastrar(cadastroCurso: Curso): Observable<any> {
    return this.http.post(
      env.baseApiUrl + this.PATH, cadastroCurso,
      this.httpUtil.headers()
    );
  }

  alterar(id: string, alterarCurso: Curso): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + id, alterarCurso,
      this.httpUtil.headers()
    );
  }
}
