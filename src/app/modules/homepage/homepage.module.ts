import { NgModule } from "@angular/core";
import { HomepageComponent } from "./components/homepage.component";
import { homepageRouting } from "./homepage-routing.module";
import { Header1Component } from "../ui/header1/header1.component";
import { AnchorComponent } from "../ui/anchor/anchor.component";

@NgModule({
  declarations: [
    AnchorComponent,
    Header1Component,
    HomepageComponent
  ],
  imports: [ homepageRouting ]
})

export class HomepageModule { }
