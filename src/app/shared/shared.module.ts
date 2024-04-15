import { NgModule } from '@angular/core';
import { PrimeNgModule } from './prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [CommonModule, FormsModule, PrimeNgModule, TranslateModule],
})
export class SharedModule {}
