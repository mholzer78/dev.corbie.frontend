import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoremImageComponent } from './main/lorem-image/lorem-image.component';
import { CrbHttp404 } from 'crb-lib-http404';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'api.corbie.dev' },
  { path: 'lorem-image', component: LoremImageComponent, title:'Lorem Image' },
  { path: '**', component: CrbHttp404, title:'HTTP404' },
];