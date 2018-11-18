import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { landingPageRouting } from "./landing-page-routing.module";
import { Header1Component } from "../ui/header1/header1.component";
import { AnchorComponent } from "../ui/anchor/anchor.component";
import { TextfieldComponent } from "../ui/textfield/textfield.component";
import { FormsModule } from "@angular/forms";
import { ClickButtonComponent } from "../ui/click-button/click-button.component";

import { UiModule } from "../ui/ui.module";
import { EducationStepComponent } from "./components/education-step/education-step.component";

@NgModule({
  declarations: [
    EducationStepComponent,
    FooterComponent,
    LandingPageComponent,
  ],
  imports: [
    landingPageRouting,
    FormsModule,
    UiModule
  ]
})

export class LandingPageModule { }
