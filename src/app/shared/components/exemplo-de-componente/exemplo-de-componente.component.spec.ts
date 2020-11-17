import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExemploDeComponenteComponent } from './exemplo-de-componente.component';

describe('ExemploDeComponenteComponent', () => {
  let component: ExemploDeComponenteComponent;
  let fixture: ComponentFixture<ExemploDeComponenteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemploDeComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploDeComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
