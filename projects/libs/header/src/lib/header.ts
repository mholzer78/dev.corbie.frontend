import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';

import { LocalStorage, StorageMain } from '@libs/local-storage';
import { Icons } from '@libs/icons';

@Component({
  selector: 'header[CrbHeader]',
  standalone: true,
  imports: [Icons],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  changeDesign = output<boolean>();
  darkMode = true;
  private readonly localStorageService = inject(LocalStorage);

  ngOnInit(): void {
    this.darkMode = this.localStorageService.getProp('main').darkMode;
    this.changeDesign.emit(this.darkMode);
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    const storageMain = this.localStorageService.getProp('main') as StorageMain;
    storageMain.darkMode = this.darkMode;
    this.localStorageService.setProp('main', storageMain);
  }

  toggleColor(): void {
    this.darkMode = !this.darkMode;
    this.changeDesign.emit(this.darkMode);
    this.store2storage();
  }
}
