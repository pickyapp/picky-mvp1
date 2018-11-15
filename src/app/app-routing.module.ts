import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './modules/homepage/homepage.module#HomepageModule' },
  { path: 'g', loadChildren: './modules/game-session/game-session.module#GameSessionModule' }
];

export const RootRouting = RouterModule.forRoot(routes);
