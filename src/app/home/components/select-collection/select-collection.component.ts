import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CollectionUtils } from 'src/app/shared/utils/collection.utils';

@Component({
  selector: 'app-select-collection',
  standalone: true,
  imports: [TranslateModule, DropdownModule, PanelModule, FormsModule, NgIf],
  templateUrl: './select-collection.component.html',
  styleUrl: './select-collection.component.scss',
})
export class SelectCollectionComponent {
  public allCollections: { code: string; name: string }[];

  public selectCollectionPl?: string;

  @Input() public collection?: { code: string; name: string };

  @Output() public collectionChange = new EventEmitter();

  constructor(translateService: TranslateService) {
    this.allCollections = CollectionUtils.getList(translateService);
  }

  public update() {
    this.collectionChange.emit(this.collection);
  }
}
