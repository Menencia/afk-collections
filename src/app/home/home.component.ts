import { Component } from '@angular/core';

import { Affix } from '../shared/models/affix';
import { SharedModule } from '../shared/shared.module';
import { UiLayoutDefaultComponent } from '../shared/ui/ui-layout-default/ui-layout-default.component';
import { ResultsComponent } from './ui/results/results.component';
import { SelectAffixComponent } from './ui/select-affix/select-affix.component';
import { SelectCollectionComponent } from './ui/select-collection/select-collection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UiLayoutDefaultComponent,
    SharedModule,
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
