import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

import { Collection } from '../../models/hero';

@Component({
  selector: 'app-hero-collections',
  standalone: true,
  imports: [TranslateModule, BadgeModule, TooltipModule, NgFor],
  templateUrl: './hero-collections.component.html',
  styleUrl: './hero-collections.component.scss',
})
export class HeroCollectionsComponent {
  @Input() public collections: Collection[] = [];
}
