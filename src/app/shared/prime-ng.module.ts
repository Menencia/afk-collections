import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

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
