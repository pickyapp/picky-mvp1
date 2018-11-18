import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

export const landingPageRouting = RouterModule.forChild(routes);


