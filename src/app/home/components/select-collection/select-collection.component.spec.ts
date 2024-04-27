import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { SelectCollectionComponent } from './select-collection.component';

describe('SelectCollectionComponent', () => {
  let component: SelectCollectionComponent;
  let fixture: ComponentFixture<SelectCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SelectCollectionComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
