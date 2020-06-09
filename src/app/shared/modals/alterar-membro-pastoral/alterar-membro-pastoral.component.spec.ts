import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarMembroPastoralComponent } from './alterar-membro-pastoral.component';

describe('AlterarMembroPastoralComponent', () => {
  let component: AlterarMembroPastoralComponent;
  let fixture: ComponentFixture<AlterarMembroPastoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarMembroPastoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarMembroPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
