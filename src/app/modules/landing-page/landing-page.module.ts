import { DirectivesModule } from './../../directives/directives.module';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { landingPageRouting } from "./landing-page-routing.module";
import { FormsModule } from "@angular/forms";

import { UiModule } from "../ui/ui.module";
import { EducationStepComponent } from "./components/education-step/education-step.component";

@NgModule({
  declarations: [
    EducationStepComponent,
    FooterComponent,
    LandingPageComponent,
  ],
  imports: [
    DirectivesModule,
    FormsModule,
    landingPageRouting,
    UiModule
  ]
})

export class LandingPageModule { }
