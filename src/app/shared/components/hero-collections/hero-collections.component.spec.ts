import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCollectionsComponent } from './hero-collections.component';

describe('HeroCollectionsComponent', () => {
  let component: HeroCollectionsComponent;
  let fixture: ComponentFixture<HeroCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCollectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
