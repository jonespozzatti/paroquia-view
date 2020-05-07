import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarParoquianoComponent } from './cadastrar-paroquiano.component';

describe('CadastrarParoquianoComponent', () => {
  let component: CadastrarParoquianoComponent;
  let fixture: ComponentFixture<CadastrarParoquianoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarParoquianoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarParoquianoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
