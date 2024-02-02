import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersDataComponent } from './workers-data.component';

describe('WorkersDataComponent', () => {
  let component: WorkersDataComponent;
  let fixture: ComponentFixture<WorkersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
