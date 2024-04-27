import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuSidebarComponent } from './shared/components/menu-sidebar/menu-sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuSidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public sidebarVisible = false;
}
