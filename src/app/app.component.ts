import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public sidebarVisible = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
  ) {
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
