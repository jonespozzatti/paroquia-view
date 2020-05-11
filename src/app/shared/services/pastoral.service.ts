import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastoralService {

  private readonly PATH: string = 'pastoral';
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
}
