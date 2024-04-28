import { NgFor, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { IngameSource } from 'src/app/core/sources/ingame.source';
import { VlabSource } from 'src/app/core/sources/vlab.source';
import { HeroAffixesComponent } from 'src/app/shared/components/hero-affixes/hero-affixes.component';
import { HeroCollectionsComponent } from 'src/app/shared/components/hero-collections/hero-collections.component';
import { Affix } from 'src/app/shared/models/affix';
import { SelectedCollection } from 'src/app/shared/models/collection';
import { Source } from 'src/app/shared/models/source';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    TranslateModule,
    HeroCollectionsComponent,
    HeroAffixesComponent,
    TagModule,
    PanelModule,
    CardModule,
    TitleCasePipe,
    NgFor,
    TooltipModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnChanges {
  @Input() selectedCollection?: SelectedCollection;

  @Input() affixes: Affix[] = [];

  sources: Source[] = [];

  constructor(private data: DataService) {
    this.data.getVlabPriorities().subscribe((heroes) => {
      this.sources.push(new VlabSource(heroes));
    });
    this.data.getInGamePriorities().subscribe((heroes) => {
      this.sources.push(new IngameSource(heroes));
    });
  }

  ngOnChanges() {
    this.updateHeroes();
  }

  updateHeroes() {
    this.sources.forEach((source) => {
      source.updateResults(this.selectedCollection, this.affixes);
    });
  }
}
