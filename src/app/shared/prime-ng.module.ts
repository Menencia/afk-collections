import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

const primeNgModules = [
  AutoCompleteModule,
  ChipModule,
  CardModule,
  TagModule,
  DropdownModule,
  TooltipModule,
  PanelModule,
  BadgeModule,
  SidebarModule,
  ButtonModule,
];

@NgModule({
  imports: [...primeNgModules],
  exports: [...primeNgModules],
})
export class PrimeNgModule {}
