import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCreationComponent } from './publish-creation.component';

describe('PublishCreationComponent', () => {
  let component: PublishCreationComponent;
  let fixture: ComponentFixture<PublishCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
