import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LieuxDrivingTrafficPage } from './lieux-driving-traffic.page';

describe('LieuxDrivingTrafficPage', () => {
  let component: LieuxDrivingTrafficPage;
  let fixture: ComponentFixture<LieuxDrivingTrafficPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuxDrivingTrafficPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LieuxDrivingTrafficPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
