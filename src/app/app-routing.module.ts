import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './modules/about-us/about-us.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/landing-page/landing-page.module#LandingPageModule' },
  { path: 'about', component: AboutUsComponent },
  { path: 'live', loadChildren: './modules/game-session/game-session.module#GameSessionModule' }
];

export const RootRouting = RouterModule.forRoot(routes);
