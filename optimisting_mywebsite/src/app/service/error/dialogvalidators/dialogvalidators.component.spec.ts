import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvalidatorsComponent } from './dialogvalidators.component';

describe('DialogvalidatorsComponent', () => {
  let component: DialogvalidatorsComponent;
  let fixture: ComponentFixture<DialogvalidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogvalidatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogvalidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
