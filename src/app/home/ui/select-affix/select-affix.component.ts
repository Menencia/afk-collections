import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Affix } from 'src/app/shared/models/affix';
import { SharedModule } from 'src/app/shared/shared.module';
import { AffixUtils } from 'src/app/shared/utils/affix.utils';

@Component({
  selector: 'app-select-affix',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './select-affix.component.html',
  styleUrl: './select-affix.component.scss',
})
export class SelectAffixComponent {
  @Input() public affixes: Affix[] = [];
  @Output() public affixesChange = new EventEmitter();

  public addAffixPl?: string;
  public selectedAffix?: Affix;
  public suggestions: { code: string; name: string }[];
  private allSuggestions: { code: string; name: string }[];

  constructor(private translateService: TranslateService) {
    this.allSuggestions = AffixUtils.getList(translateService);
    this.suggestions = [...this.allSuggestions];
    this.translateService.onLangChange.subscribe(() => {
      this.addAffixPl = this.translateService.instant('Add affix');
    });
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.selectedAffix = undefined;
    this.affixes.push(event.value as Affix);
    this.affixesChange.emit(this.affixes);
  }

  public removeAffix(affix: Affix): void {
    this.affixes = this.affixes.filter((s) => s !== affix);
    this.affixesChange.emit(this.affixes);
  }

  public search(event: { query: string }): void {
    this.allSuggestions = AffixUtils.getList(this.translateService);
    this.suggestions = this.allSuggestions.filter((affix) =>
      affix.name.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
}
