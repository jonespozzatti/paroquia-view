import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPastoraisComponent } from './listar-pastorais.component';

describe('ListarPastoraisComponent', () => {
  let component: ListarPastoraisComponent;
  let fixture: ComponentFixture<ListarPastoraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPastoraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPastoraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
