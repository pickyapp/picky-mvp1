import { NgModule } from "@angular/core";
import { UiModule } from "../ui/ui.module";
import { LandingPageComponent } from "./landing-page.component";
import { Routes, RouterModule } from "@angular/router";
import { FooterModule } from "../footer/footer.module";

const components = [
  LandingPageComponent
];

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];


@NgModule({
  declarations: components,
  imports: [
    FooterModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  exports: components
})

export class LandingPageModule { }
