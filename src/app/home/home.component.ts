import { Component } from '@angular/core';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Hero, HeroJson } from '../shared/models/hero';
import { HttpClient } from '@angular/common/http';

interface Stat {
  name: string;
  level?: string;
}

interface ResultHero {
  hero: Hero;
  score: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public selectedStat?: Stat;
  public suggestions: string[];
  public stats: Stat[] = [];
  public results: ResultHero[] = [];

  private allSuggestions: string[];
  private allHeroes: Hero[] = [];

  constructor(private http: HttpClient) {
    this.allSuggestions = ['atk', 'err'];
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
    this.suggestions = this.suggestions.filter((stat) =>
      stat.includes(event.query),
    );
  }

  public select(event: AutoCompleteSelectEvent): void {
    this.stats.push({ name: event.value });
    this.suggestions = [...this.allSuggestions];
    this.selectedStat = undefined;
    this.updateHeroes();
  }

  public removeStat(stat: Stat): void {
    this.stats = this.stats.filter((s) => s !== stat);
    this.updateHeroes();
  }

  /**
   * Show 5 heroes with best scores
   */
  updateHeroes(): void {
    // update scores
    let results: ResultHero[] = this.allHeroes.map((hero) => {
      let score = 0;
      hero.offStats.forEach((offStat) => {
        if (this.stats.map((s) => s.name).includes(offStat)) {
          score++;
        }
      });
      hero.defStats.forEach((defStat) => {
        if (this.stats.map((s) => s.name).includes(defStat)) {
          score++;
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
