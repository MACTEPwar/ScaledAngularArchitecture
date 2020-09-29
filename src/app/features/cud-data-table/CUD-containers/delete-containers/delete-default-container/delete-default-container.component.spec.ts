import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDefaultContainerComponent } from './delete-default-container.component';

describe('DeleteDefaultContainerComponent', () => {
  let component: DeleteDefaultContainerComponent;
  let fixture: ComponentFixture<DeleteDefaultContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDefaultContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDefaultContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
