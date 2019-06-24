import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './modules/about-us/about-us.component';

const routes: Routes = [
  { path: 'live', loadChildren: './modules/live-landing-page/live-landing-page.module#LiveLandingPageModule' },
  { path: 'about', component: AboutUsComponent }
];

export const RootRouting = RouterModule.forRoot(routes);
