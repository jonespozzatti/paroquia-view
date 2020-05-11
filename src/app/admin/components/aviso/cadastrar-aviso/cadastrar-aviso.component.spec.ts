import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAvisoComponent } from './cadastrar-aviso.component';

describe('CadastrarAvisoComponent', () => {
  let component: CadastrarAvisoComponent;
  let fixture: ComponentFixture<CadastrarAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
