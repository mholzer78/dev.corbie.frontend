import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@libs/header';
import { Nav } from '@libs/nav';
import { routes } from './app.routes';
import { LocalStorage, StorageMain } from '@libs/local-storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.darkMode]': 'darkmode()',
  },
})
export class App implements OnInit {
  test = 'darkMode';
  routes = routes;
  private readonly localStorageService = inject(LocalStorage);

  darkmode = signal(false);

  ngOnInit() {
    console.debug('Hello Corbie');

    const storageMain = (this.localStorageService.getProp('main') as StorageMain) || undefined;
    if (storageMain !== undefined) {
      this.darkmode.set(storageMain.darkMode);
    } else {
      const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      if (darkModeMql && darkModeMql.matches) {
        this.darkmode.set(true);
      }
      const storageMain = {
        showText: false,
        darkMode: this.darkmode(),
      };
      this.localStorageService.setProp('main', storageMain);
    }
  }

  changeDesign(value: boolean) {
    this.darkmode.set(value);
  }
}
