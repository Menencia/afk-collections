import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

import { HeroAffixesComponent } from '../shared/components/hero-affixes/hero-affixes.component';
import { HeroCollectionsComponent } from '../shared/components/hero-collections/hero-collections.component';
import { UiLayoutDefaultComponent } from '../shared/components/ui-layout-default/ui-layout-default.component';
import { TableRowDirective } from '../shared/directives/table-row.directive';
import { Hero } from '../shared/models/hero';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    UiLayoutDefaultComponent,
    TableModule,
    TableRowDirective,
    HeroCollectionsComponent,
    HeroAffixesComponent,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent {
  public heroes: Hero[] = [];

  constructor(private data: DataService) {
    this.data.getVlabPriorities().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}
