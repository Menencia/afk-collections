import { Component } from '@angular/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Hero, HeroJson } from '../shared/models/hero';
import { HttpClient } from '@angular/common/http';
import { AffixUtils } from '../shared/utils/affix.utils';

interface Affix {
  name: string;
  level?: string;
}

interface ResultHero {
  hero: Hero;
  score: number;
}

const MAX_AFFIX_PRIORITIES = 4;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public selectedAffix?: Affix;
  public suggestions: string[];
  public affixes: Affix[] = [];
  public results: ResultHero[] = [];

  private allSuggestions: string[];
  private allHeroes: Hero[] = [];

  constructor(private http: HttpClient) {
    this.allSuggestions = AffixUtils.getList();
    this.suggestions = [...this.allSuggestions];
    this.http.get('/assets/heroes.json').subscribe((data: unknown) => {
      this.allHeroes = (data as HeroJson[]).map((d) => {
        const collections = d.colls.map((coll) => {
          return { name: coll[0], level: coll[1] };
        });
        return new Hero(d.name, collections, d.stats[0], d.stats[1]);
      });
    });
  }

  public search(event: { query: string }): void {
    this.suggestions = this.allSuggestions.filter((affix) =>
      affix.includes(event.query),
    );
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.affixes.push({ name: event.value });
    this.selectedAffix = undefined;
    this.updateHeroes();
  }

  public removeAffix(affix: Affix): void {
    this.affixes = this.affixes.filter((s) => s !== affix);
    this.updateHeroes();
  }

  /**
   * Show 5 heroes with best scores
   */
  updateHeroes(): void {
    // update scores
    let results: ResultHero[] = this.allHeroes.map((hero) => {
      let score = 0;
      hero.offAffixes.forEach((offAffix, index) => {
        if (this.affixes.map((s) => s.name).includes(offAffix)) {
          score += MAX_AFFIX_PRIORITIES - index;
        }
      });
      hero.defAffixes.forEach((defAffix, index) => {
        if (this.affixes.map((s) => s.name).includes(defAffix)) {
          score += MAX_AFFIX_PRIORITIES - index;
        }
      });
      return {
        hero: hero,
        score,
      };
    });

    // sort by scores
    results = results.sort((a, b) => b.score - a.score);

    // take 5 first
    this.results = results.slice(0, 5);
  }
}
