import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {
  	let httpHeaders: HttpHeaders = new HttpHeaders();
	
  	if (localStorage['token']) {
  	  httpHeaders = httpHeaders.set(
  	  	'Authorization', 'Bearer ' + localStorage['token']
  	  );
  	}
    
    return { headers: httpHeaders };
  }

  obterIdUsuario(): string {
  	if (!localStorage['token']) {
  	  return '';
  	}
  	const dadosUsuario = this.obterDadosUsuario();
  	return dadosUsuario ? dadosUsuario.id : '';
  }

  obterIdParoquia(): string {
  	if (!localStorage['paroquia']) {
  	  return '';
  	}
  	return JSON.parse(localStorage['paroquia'])['id'];
  }

  obterNomeParoquia(): string {
  	if (!localStorage['paroquia']) {
  	  return '';
  	}
  	
  	return JSON.parse(localStorage['paroquia'])['descricao'];
  }

  obterIdEmpresa(): string {
    if (!localStorage['token']) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }

  obterPerfil(): string {
    if (!localStorage['token']) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.role : '';
  }
	
}
