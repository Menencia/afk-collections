import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

import { Hero, HeroJson } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getVlabPriorities(): Observable<Hero[]> {
    return this.getHeroesJson('/assets/sources/vlab.json');
  }

  getInGamePriorities(): Observable<Hero[]> {
    return forkJoin([
      this.getHeroesJson('/assets/sources/ingame/light.json'),
      this.getHeroesJson('/assets/sources/ingame/mauler.json'),
      this.getHeroesJson('/assets/sources/ingame/wilder.json'),
      this.getHeroesJson('/assets/sources/ingame/graveborn.json'),
      this.getHeroesJson('/assets/sources/ingame/celest.json'),
      this.getHeroesJson('/assets/sources/ingame/hypogean.json'),
      this.getHeroesJson('/assets/sources/ingame/dimensional.json'),
    ]).pipe(
      map((heroes) => {
        return heroes.flat();
      }),
    );
  }

  /**
   * Return all heroes from json file
   * @returns list of heroes
   */
  private getHeroesJson(file: string): Observable<Hero[]> {
    return this.http.get<HeroJson[]>(file).pipe(
      map((heroes) => {
        return heroes.map((d) => {
          const collections = d.colls.map((coll) => {
            return { name: coll[0], level: coll[1] };
          });
          return new Hero(d.name, collections, d.stats[0], d.stats[1]);
        });
      }),
    );
  }
}
