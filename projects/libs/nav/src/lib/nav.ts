import { Component, inject, input, OnDestroy, OnInit, output } from '@angular/core';
import { LocalStorage, StorageMain } from '@libs/local-storage';
import { Icons } from '@libs/icons';
import { NavItem } from './nav-item/nav-item';
import { Routes } from '@angular/router';

@Component({
  selector: 'nav[CrbNav]',
  standalone: true,
  imports: [Icons, NavItem],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit, OnDestroy {
  routes = input.required<Routes>();
  pages!: Routes;
  private readonly localStorageService = inject(LocalStorage);

  showText = true;

  ngOnInit(): void {
    this.pages = this.routes().filter(
      (route) => !route.path!.startsWith('**') && route.path !== '',
    );
    this.showText = this.localStorageService.getProp('main').showText;
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    const storageMain = (this.localStorageService.getProp('main') as StorageMain) || {
      showText: false,
      darkMode: false,
    };
    storageMain.showText = this.showText;
    this.localStorageService.setProp('main', storageMain);
  }

  toggleNav(): void {
    this.showText = !this.showText;
    this.store2storage();
  }
}
