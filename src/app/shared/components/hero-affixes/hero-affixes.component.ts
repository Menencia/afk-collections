import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-hero-affixes',
  standalone: true,
  imports: [NgFor, TooltipModule, TranslateModule],
  templateUrl: './hero-affixes.component.html',
  styleUrl: './hero-affixes.component.scss',
})
export class HeroAffixesComponent {
  @Input() public affixes: string[] = [];
}
