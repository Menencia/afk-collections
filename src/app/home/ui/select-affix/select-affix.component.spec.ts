import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAffixComponent } from './select-affix.component';

describe('SelectAffixComponent', () => {
  let component: SelectAffixComponent;
  let fixture: ComponentFixture<SelectAffixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAffixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
