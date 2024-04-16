import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { MenuSidebarComponent } from './shared/ui/menu-sidebar/menu-sidebar.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';

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
