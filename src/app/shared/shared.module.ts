import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeNgModule } from './prime-ng.module';

@NgModule({
  exports: [CommonModule, FormsModule, PrimeNgModule, TranslateModule],
})
export class SharedModule {}
