import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() public sidebarVisible = false;

  @Output() public sidebarVisibleChange = new EventEmitter();

  public title = 'afk-collections';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public openMenuSidebar() {
    this.sidebarVisible = true;
    this.sidebarVisibleChange.emit(true);
  }

  public changeLocale(event: MouseEvent, lang: string) {
    event.preventDefault();
    this.translate.use(lang);
  }

  public isLocale(lang: string): boolean {
    return lang === this.translate.currentLang;
  }
}
