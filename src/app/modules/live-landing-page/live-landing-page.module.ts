import { DirectivesModule } from '../../directives/directives.module';
import { NgModule } from "@angular/core";
import { LiveLandingPageComponent } from "./components/live-landing-page/live-landing-page.component";
import { landingPageRouting } from "./live-landing-page-routing.module";
import { FormsModule } from "@angular/forms";

import { UiModule } from "../ui/ui.module";
import { EducationStepComponent } from "./components/education-step/education-step.component";
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    EducationStepComponent,
    LiveLandingPageComponent,
  ],
  imports: [
    DirectivesModule,
    FooterModule,
    FormsModule,
    landingPageRouting,
    UiModule
  ]
})

export class LiveLandingPageModule { }
