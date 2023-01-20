import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCandidatesComponent } from './dialog-candidates.component';

describe('DialogCandidatesComponent', () => {
  let component: DialogCandidatesComponent;
  let fixture: ComponentFixture<DialogCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
