import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCreationComponent } from './main.component';

describe('ArtCreationComponent', () => {
  let component: ArtCreationComponent;
  let fixture: ComponentFixture<ArtCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
