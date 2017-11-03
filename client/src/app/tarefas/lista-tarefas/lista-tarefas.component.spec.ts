import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasComponent } from './lista-tarefas.component';

describe('ListaTarefasComponent', () => {
  let component: ListaTarefasComponent;
  let fixture: ComponentFixture<ListaTarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTarefasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
