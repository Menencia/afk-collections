import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { filter } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-menu-sidebar',
  standalone: true,
  imports: [RouterModule, TranslateModule, SidebarModule],
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.scss',
})
export class MenuSidebarComponent implements OnInit, OnDestroy {
  @Input() public visible = false;

  @Output() public visibleChange = new EventEmitter();

  private sub = new SubSink();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    /** Close automatically the sidebar when a url change is detected */
    this.sub.sink = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.visible = false;
          this.visibleChange.emit(this.visible);
        }
      });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public updateVisible(): void {
    this.visibleChange.emit(this.visible);
  }
}
