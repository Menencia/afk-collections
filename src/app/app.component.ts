import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MenuSidebarComponent } from './shared/components/menu-sidebar/menu-sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SharedModule,
    MenuSidebarComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public sidebarVisible = false;
}
