import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout2Component } from './layout-2.component';

describe('Layout2Component', () => {
  let component: Layout2Component;
  let fixture: ComponentFixture<Layout2Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Layout2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
