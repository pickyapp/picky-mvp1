import { NgModule } from "@angular/core";
import { HomepageComponent } from "./components/homepage.component";
import { homepageRouting } from "./homepage-routing.module";

@NgModule({
  declarations: [ HomepageComponent ],
  imports: [ homepageRouting ]
})

export class HomepageModule { }
