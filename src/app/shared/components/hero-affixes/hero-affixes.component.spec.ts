import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAffixesComponent } from './hero-affixes.component';

describe('HeroAffixesComponent', () => {
  let component: HeroAffixesComponent;
  let fixture: ComponentFixture<HeroAffixesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAffixesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroAffixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
