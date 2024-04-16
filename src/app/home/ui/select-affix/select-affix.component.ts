import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Affix } from 'src/app/shared/models/affix';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchAffixComponent } from '../search-affix/search-affix.component';

@Component({
  selector: 'app-select-affix',
  standalone: true,
  imports: [SharedModule, SearchAffixComponent],
  templateUrl: './select-affix.component.html',
  styleUrl: './select-affix.component.scss',
})
export class SelectAffixComponent {
  @Input() public affixes: Affix[] = [];
  @Output() public affixesChange = new EventEmitter();

  public select(newAffix: Affix): void {
    this.affixes.push(newAffix);
    this.affixesChange.emit(this.affixes);
  }

  public removeAffix(affix: Affix): void {
    this.affixes = this.affixes.filter((s) => s !== affix);
    this.affixesChange.emit(this.affixes);
  }
}
