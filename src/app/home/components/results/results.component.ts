import { Component, Input, OnChanges } from '@angular/core';
import { HeroAffixesComponent } from 'src/app/shared/components/hero-affixes/hero-affixes.component';
import { HeroCollectionsComponent } from 'src/app/shared/components/hero-collections/hero-collections.component';
import { Affix } from 'src/app/shared/models/affix';
import { Hero } from 'src/app/shared/models/hero';
import { ResultHero } from 'src/app/shared/models/result-hero';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedModule } from 'src/app/shared/shared.module';

const MAX_AFFIX_PRIORITIES = 4;

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [SharedModule, HeroCollectionsComponent, HeroAffixesComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnChanges {
  @Input() public selectedCollection?: { code: string; name: string };

  @Input() public affixes: Affix[] = [];

  public results: ResultHero[] = [];

  private allHeroes: Hero[] = [];

  constructor(private data: DataService) {
    this.data.getHeroes().subscribe((heroes) => {
      this.allHeroes = heroes;
    });
  }

  public ngOnChanges(): void {
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
        hero,
        score,
      };
    });

    // sort by scores
    results = results.sort((a, b) => b.score - a.score);

    // take 5 first
    this.results = results.slice(0, 5);
  }
}
