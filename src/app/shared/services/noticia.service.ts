import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Noticia } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private readonly PATH: string = 'noticia';
  private readonly PATH_NOTICIAS_PAG = '/paroquia/pag/{paroquiaId}';
  

  constructor(
    private http: HttpClient,
  	private httpUtil: HttpUtilService
  ) { }
 
  listarNoticiasPaginado(
    pagina: number,
    ordem: string,
    direcao:string): Observable<any> {
      const url: string = env.baseApiUrl + this.PATH +
      this.PATH_NOTICIAS_PAG.replace('{paroquiaId}', this.httpUtil.obterIdParoquia());
      const params: string = '?pag=' + pagina + '&ord=' + ordem + '&dir=' + direcao;
      return this.http.get(url + params, this.httpUtil.headers());
  }

  obterNoticia(noticiaId: string): Observable<any> {
    return this.http.get(
      env.baseApiUrl + this.PATH + '/' + noticiaId,
      this.httpUtil.headers()
    );
  }

  remover(noticiaId: string) : Observable<any> {
    return this.http.delete(
      env.baseApiUrl + this.PATH + '/' + noticiaId,
      this.httpUtil.headers()
    );
  }

  cadastrar(cadastroNoticia: Noticia): Observable<any> {
    return this.http.post(
      env.baseApiUrl + this.PATH, cadastroNoticia,
      this.httpUtil.headers()
    );
  }

  alterar(id: string, alterarNoticia: Noticia): Observable<any> {
    return this.http.put(
      env.baseApiUrl + this.PATH + '/' + id, alterarNoticia,
      this.httpUtil.headers()
    );
  }
}
