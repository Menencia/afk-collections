import { Component } from '@angular/core';

import { UiLayoutDefaultComponent } from '../shared/components/ui-layout-default/ui-layout-default.component';
import { Affix } from '../shared/models/affix';

import { ResultsComponent } from './components/results/results.component';
import { SelectAffixComponent } from './components/select-affix/select-affix.component';
import { SelectCollectionComponent } from './components/select-collection/select-collection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UiLayoutDefaultComponent,
    SelectCollectionComponent,
    SelectAffixComponent,
    ResultsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public selectedCollection?: { code: string; name: string };

  public affixes: Affix[] = [];
}
