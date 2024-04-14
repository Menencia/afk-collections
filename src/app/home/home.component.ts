import { Component } from '@angular/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';

interface Stat {
  name: string;
  level?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public selectedStat?: Stat;
  public allSuggestions: string[];
  public suggestions: string[];
  public stats: Stat[] = [];

  constructor() {
    this.allSuggestions = ['atk', 'err'];
    this.suggestions = [...this.allSuggestions];
  }

  public search(event: { query: string }): void {
    this.suggestions = this.suggestions.filter((stat) =>
      stat.includes(event.query),
    );
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.stats.push({ name: event.value });
    this.suggestions = [...this.allSuggestions];
    this.selectedStat = undefined;
  }

  public removeStat(stat: Stat): void {
    this.stats = this.stats.filter((s) => s !== stat);
  }
}
