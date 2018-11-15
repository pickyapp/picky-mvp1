import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
];

export const homepageRouting = RouterModule.forChild(routes);


