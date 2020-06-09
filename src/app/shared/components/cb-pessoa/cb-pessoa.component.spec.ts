import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbPessoaComponent } from './cb-pessoa.component';

describe('CbPessoaComponent', () => {
  let component: CbPessoaComponent;
  let fixture: ComponentFixture<CbPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
