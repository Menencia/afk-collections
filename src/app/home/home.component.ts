import { Component } from '@angular/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Hero, HeroJson } from '../shared/models/hero';
import { HttpClient } from '@angular/common/http';
import { AffixUtils } from '../shared/utils/affix.utils';
import { CollectionUtils } from '../shared/utils/collection.utils';
import { TranslateService } from '@ngx-translate/core';

interface Affix {
  name: string;
  code: string;
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
  public suggestions: { code: string; name: string }[];
  public affixes: Affix[] = [];
  public results: ResultHero[] = [];
  public selectedCollection?: { code: string; name: string };
  public allCollections: { code: string; name: string }[];

  private allSuggestions: { code: string; name: string }[];
  private allHeroes: Hero[] = [];

  public selectCollectionPl?: string;
  public addAffixPl?: string;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
  ) {
    this.allSuggestions = AffixUtils.getList(translateService);
    this.suggestions = [...this.allSuggestions];
    this.http.get('/assets/heroes.json').subscribe((data: unknown) => {
      this.allHeroes = (data as HeroJson[]).map((d) => {
        const collections = d.colls.map((coll) => {
          return { name: coll[0], level: coll[1] };
        });
        return new Hero(d.name, collections, d.stats[0], d.stats[1]);
      });
    });
    this.allCollections = CollectionUtils.getList(translateService);
    this.translateService.onLangChange.subscribe(() => {
      this.selectCollectionPl =
        this.translateService.instant('Select collection');
      this.addAffixPl = this.translateService.instant('Add affix');
    });
  }

  public search(event: { query: string }): void {
    this.allSuggestions = AffixUtils.getList(this.translateService);
    this.suggestions = this.allSuggestions.filter((affix) =>
      affix.name.toLowerCase().includes(event.query),
    );
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.affixes.push(event.value as Affix);
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
    // filter by selected collection
    let heroes = this.allHeroes;

    if (this.selectedCollection) {
      heroes = heroes.filter((hero) => {
        return hero.collections.find(
          (coll) => coll.name === this.selectedCollection?.code,
        );
      });
    }

    if (this.affixes.length === 0) {
      this.results = [];
      return;
    }

    // update scores
    let results: ResultHero[] = heroes.map((hero) => {
      let score = 0;
      hero.offAffixes.forEach((offAffix, index) => {
        if (this.affixes.map((s) => s.code).includes(offAffix)) {
          score += MAX_AFFIX_PRIORITIES - index;
        }
      });
      hero.defAffixes.forEach((defAffix, index) => {
        if (this.affixes.map((s) => s.code).includes(defAffix)) {
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
