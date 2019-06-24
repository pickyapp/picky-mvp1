import { Routes, RouterModule } from "@angular/router";
import { LiveLandingPageComponent } from "./components/live-landing-page/live-landing-page.component";

const routes: Routes = [
  { path: '', component: LiveLandingPageComponent },
  { path: ':gameSessionName', loadChildren: '../game-session/game-session.module#GameSessionModule' }
];

export const landingPageRouting = RouterModule.forChild(routes);


