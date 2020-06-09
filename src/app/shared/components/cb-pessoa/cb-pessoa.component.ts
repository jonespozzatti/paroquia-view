import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PessoapastoralService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Pessoa } from '../../auxiliar';


@Component({
  selector: 'app-cb-pessoa',
  templateUrl: './cb-pessoa.component.html',
  styleUrls: ['./cb-pessoa.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CbPessoaComponent,
    multi: true
  }]
})
export class CbPessoaComponent implements OnInit {

  @Input() permiteTodas = true;
    unitCtrl: FormControl;
    pessoasFiltradas: Observable<any[]>;
    pessoas: Array<Pessoa> = [];
    onChange: Function = () => {};
    pessoaSelecionada;
    @Output()
    onSelect : EventEmitter<Pessoa> = new EventEmitter();
    pastoralId: string;
  constructor(
    private route: ActivatedRoute,
    public pessoaPastoralService: PessoapastoralService
  ) { 
    this.route.params.subscribe(params => this.pastoralId = params['idPastoral']);
  }

  ngOnInit(): void {
    
    this.unitCtrl = new FormControl();
        this.pessoaPastoralService.listarPessoasNaoPertecemPastoralID(this.pastoralId).subscribe(retorno => {
            this.pessoas = retorno;
            this.pessoasFiltradas = this.unitCtrl.valueChanges.pipe(
                startWith(''),
                map(membro => (membro ? this.filtrarPessoas(membro) : this.pessoas.slice()))
            )
        });
  }

filtrarPessoas(membro: any) {
    const nomePessoa = membro.nome ? membro.nome : membro;
    return this.pessoas.filter(
        state => state.nome.toLowerCase().startsWith(nomePessoa.toLowerCase())
    );
}
onSelectionChanged(event: MatAutocompleteSelectedEvent) {
  this.pessoaSelecionada = event.option.value.pessoaId;
  console.log(this.pessoaSelecionada);
  this.onChange(event.option.value.pessoaId);
  this.onSelect.emit(this.pessoaSelecionada);
}

displayFn(pessoa: Pessoa): string {
  return pessoa ? pessoa.nome : "";
}

limparSelecao(){
      this.onChange(this.pessoaSelecionada);
}

async validarSelecao(){
  await this.delay(200);
  if(this.unitCtrl.value != null && this.pessoaSelecionada != this.unitCtrl.value.pessoaId){
      this.unitCtrl.setValue(this.pessoaSelecionada);
  }
}

registerOnTouched(fn) {}

writeValue(membro) {
  if(membro){
      this.unitCtrl.setValue(membro.pessoaId);
  }
  this.pessoaSelecionada = this.unitCtrl.value; 
  this.onChange(this.pessoaSelecionada);
}

registerOnChange(fn) { 
  this.onChange = fn;
  if(this.pessoaSelecionada){
      this.onChange(this.pessoaSelecionada); 
  }
   
}

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


}
