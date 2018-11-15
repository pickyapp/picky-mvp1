import { NgModule } from "@angular/core";
import { HomepageComponent } from "./components/homepage.component";
import { homepageRouting } from "./homepage-routing.module";
import { Header1Component } from "../ui/header1/header1.component";
import { AnchorComponent } from "../ui/anchor/anchor.component";
import { TextfieldComponent } from "../ui/textfield/textfield.component";
import { FormsModule } from "@angular/forms";
import { ClickButtonComponent } from "../ui/click-button/click-button.component";

import { UiModule } from "../ui/ui.module";

@NgModule({
  declarations: [
    AnchorComponent,
    ClickButtonComponent,
    Header1Component,
    HomepageComponent,
  ],
  imports: [
    homepageRouting,
    FormsModule,
    UiModule
  ]
})

export class HomepageModule { }
