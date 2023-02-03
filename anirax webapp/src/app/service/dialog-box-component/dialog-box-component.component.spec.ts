import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxComponentComponent } from './dialog-box-component.component';

describe('DialogBoxComponentComponent', () => {
  let component: DialogBoxComponentComponent;
  let fixture: ComponentFixture<DialogBoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
