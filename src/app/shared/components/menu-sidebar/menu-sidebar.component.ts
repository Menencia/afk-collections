import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-menu-sidebar',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss',
})
export class MenuSidebarComponent {
  @Input() public visible = false;
  @Output() public visibleChange = new EventEmitter();

  public updateVisible(): void {
    this.visibleChange.emit(this.visible);
  }
}
