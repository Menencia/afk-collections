import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SharedModule } from './shared/shared.module';
import { MenuSidebarComponent } from './shared/ui/menu-sidebar/menu-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SharedModule, MenuSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'afk-collections';
  public sidebarVisible = false;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public changeLocale(event: MouseEvent, lang: string) {
    event.preventDefault();
    this.translate.use(lang);
  }

  public isLocale(lang: string): boolean {
    return lang === this.translate.currentLang;
  }
}
