import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParoquianosComponent } from './listar-paroquianos.component';

describe('ListarParoquianosComponent', () => {
  let component: ListarParoquianosComponent;
  let fixture: ComponentFixture<ListarParoquianosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarParoquianosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarParoquianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
