import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Affix } from '../shared/models/affix';
import { Hero, HeroJson } from '../shared/models/hero';
import { SharedModule } from '../shared/shared.module';
import { UiLayoutDefaultComponent } from '../shared/ui/ui-layout-default/ui-layout-default.component';
import { SelectAffixComponent } from './ui/select-affix/select-affix.component';
import { SelectCollectionComponent } from './ui/select-collection/select-collection.component';

interface ResultHero {
  hero: Hero;
  score: number;
}

const MAX_AFFIX_PRIORITIES = 4;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UiLayoutDefaultComponent,
    SharedModule,
    SelectCollectionComponent,
    SelectAffixComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public affixes: Affix[] = [];
  public results: ResultHero[] = [];
  public selectedCollection?: { code: string; name: string };

  private allHeroes: Hero[] = [];

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
  ) {
    this.http.get('/assets/heroes.json').subscribe((data: unknown) => {
      this.allHeroes = (data as HeroJson[]).map((d) => {
        const collections = d.colls.map((coll) => {
          return { name: coll[0], level: coll[1] };
        });
        return new Hero(d.name, collections, d.stats[0], d.stats[1]);
      });
    });
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
        this.affixes
          .map((s) => s.code)
          .forEach((code) => {
            if (code.includes(offAffix)) {
              score += MAX_AFFIX_PRIORITIES - index;
            }
          });
      });
      hero.defAffixes.forEach((defAffix, index) => {
        this.affixes
          .map((s) => s.code)
          .forEach((code) => {
            if (code.includes(defAffix)) {
              score += MAX_AFFIX_PRIORITIES - index;
            }
          });
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
