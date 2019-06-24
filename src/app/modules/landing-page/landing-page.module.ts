import { NgModule } from "@angular/core";
import { UiModule } from "../ui/ui.module";
import { LandingPageComponent } from "./landing-page.component";
import { Routes, RouterModule } from "@angular/router";

const components = [
  LandingPageComponent
];

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];


@NgModule({
  declarations: components,
  imports: [
    RouterModule.forChild(routes),
    UiModule
  ],
  exports: components
})

export class LandingPageModule { }
