import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTargetsComponent } from './campaign-targets.component';

describe('CampaignTargetsComponent', () => {
  let component: CampaignTargetsComponent;
  let fixture: ComponentFixture<CampaignTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignTargetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
