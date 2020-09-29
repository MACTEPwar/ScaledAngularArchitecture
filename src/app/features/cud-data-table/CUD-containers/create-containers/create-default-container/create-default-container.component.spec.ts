import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDefaultContainerComponent } from './create-default-container.component';

describe('CreateDefaultContainerComponent', () => {
  let component: CreateDefaultContainerComponent;
  let fixture: ComponentFixture<CreateDefaultContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDefaultContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDefaultContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
