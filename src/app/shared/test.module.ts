import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './shared.module';

@NgModule({
  imports: [TranslateModule.forRoot()],
  exports: [BrowserAnimationsModule, SharedModule],
})
export class TestModule {}
