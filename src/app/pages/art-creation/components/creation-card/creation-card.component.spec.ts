import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCardComponent } from './creation-card.component';

describe('CreationCardComponent', () => {
  let component: CreationCardComponent;
  let fixture: ComponentFixture<CreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
