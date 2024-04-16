import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAffixComponent } from './search-affix.component';

describe('SearchAffixComponent', () => {
  let component: SearchAffixComponent;
  let fixture: ComponentFixture<SearchAffixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAffixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
