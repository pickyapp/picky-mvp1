import { NgModule } from "@angular/core";
import { HomepageComponent } from "./components/homepage.component";
import { homepageRouting } from "./homepage-routing.module";
import { Header1Component } from "../ui/header1/header1.component";
import { AnchorComponent } from "../ui/anchor/anchor.component";
import { TextfieldComponent } from "../ui/textfield/textfield.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AnchorComponent,
    Header1Component,
    HomepageComponent,
    TextfieldComponent
  ],
  imports: [
    homepageRouting,
    FormsModule
  ]
})

export class HomepageModule { }
