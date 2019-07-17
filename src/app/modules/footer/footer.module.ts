import { NgModule } from "@angular/core";
import { FooterComponent } from './footer.component';
import { UiModule } from "../ui/ui.module";




@NgModule({
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ],
  imports: [ UiModule ]
})

export class FooterModule { }
