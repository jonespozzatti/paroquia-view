import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly PATH: string = 'auth';
  private readonly PATH_PAROQUIA: string = 'paroquia/nome/';

  constructor( private http: HttpClient) { }

  logar(login: Login): Observable<any>{
    return this.http.post(env.baseUrl + this.PATH, login);
  }
  obterParoquia(id: string): Observable<any>{
    return this.http.get(env.baseApiUrl + this.PATH_PAROQUIA + id);
  }
}