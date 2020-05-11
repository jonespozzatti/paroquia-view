import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPastoralComponent } from './cadastrar-pastoral.component';

describe('CadastrarPastoralComponent', () => {
  let component: CadastrarPastoralComponent;
  let fixture: ComponentFixture<CadastrarPastoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPastoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
