import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAvisosComponent } from './listar-avisos.component';

describe('ListarAvisosComponent', () => {
  let component: ListarAvisosComponent;
  let fixture: ComponentFixture<ListarAvisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAvisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
