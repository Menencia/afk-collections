import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Dropdown } from 'primeng/dropdown';
import { Affix } from 'src/app/shared/models/affix';
import { SharedModule } from 'src/app/shared/shared.module';
import { AffixUtils } from 'src/app/shared/utils/affix.utils';

@Component({
  selector: 'app-search-affix',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search-affix.component.html',
  styleUrl: './search-affix.component.scss',
})
export class SearchAffixComponent {
  @ViewChild('autoComplete') public autoComplete!: Dropdown;
  @Output() public selectedAffixChange = new EventEmitter<Affix>();

  public suggestions: { code: string; name: string }[];
  private allSuggestions: { code: string; name: string }[];

  constructor(public translateService: TranslateService) {
    this.allSuggestions = AffixUtils.getList(translateService);
    this.suggestions = [...this.allSuggestions];
  }

  public search(event: { query: string }): void {
    this.allSuggestions = AffixUtils.getList(this.translateService);
    this.suggestions = this.allSuggestions.filter((affix) =>
      affix.name.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.selectedAffixChange.emit(event.value as Affix);
    this.autoComplete.writeValue('');
  }
}
