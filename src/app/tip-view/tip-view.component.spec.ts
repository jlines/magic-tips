import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipViewComponent } from './tip-view.component';

describe('TipViewComponent', () => {
  let component: TipViewComponent;
  let fixture: ComponentFixture<TipViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipViewComponent]
    });
    fixture = TestBed.createComponent(TipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
