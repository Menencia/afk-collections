import { Affix } from './affix';
import { SelectedCollection } from './collection';
import { Hero } from './hero';
import { ResultHero } from './result-hero';

export abstract class Source {
  abstract name: string;

  results: ResultHero[] = [];

  constructor(public heroes: Hero[]) {}

  abstract calculateScore(index: number): number;

  updateResults(
    selectedCollection: SelectedCollection | undefined,
    affixes: Affix[],
  ) {
    if (affixes.length === 0) {
      this.results = [];
      return;
    }

    const heroes = this.getHeroesByCollection(selectedCollection);

    const results = this.getResultsWithScore(heroes, affixes);

    this.finalizeResults(results);
  }

  private getHeroesByCollection(collection?: SelectedCollection): Hero[] {
    let { heroes } = this;

    if (collection) {
      heroes = heroes.filter((hero) => {
        return hero.collections.find((coll) => coll.name === collection?.code);
      });
    }

    return heroes;
  }

  private getResultsWithScore(heroes: Hero[], affixes: Affix[]): ResultHero[] {
    return heroes.map((hero) => {
      let score = 0;
      hero.offAffixes.forEach((offAffix, index) => {
        affixes
          .map((s) => s.code)
          .forEach((code) => {
            if (code.includes(offAffix)) {
              score += this.calculateScore(index);
            }
          });
      });
      hero.defAffixes.forEach((defAffix, index) => {
        affixes
          .map((s) => s.code)
          .forEach((code) => {
            if (code.includes(defAffix)) {
              score += this.calculateScore(index);
            }
          });
      });
      return {
        hero,
        score,
      } as ResultHero;
    });
  }

  private finalizeResults(results: ResultHero[]) {
    this.results = results.sort((a, b) => b.score - a.score).slice(0, 5);
  }
}
