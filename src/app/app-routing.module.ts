import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './modules/homepage/homepage.module#HomepageModule' }
];

export const RootRouting = RouterModule.forRoot(routes);
