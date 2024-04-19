import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Hero, HeroJson } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Return all heroes from json file
   * @returns list of heroes
   */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<HeroJson[]>('/assets/heroes.json').pipe(
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
