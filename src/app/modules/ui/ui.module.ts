import { NgModule } from "@angular/core";
import { TextfieldComponent } from "./textfield/textfield.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    TextfieldComponent
  ],
  imports: [ FormsModule ],
  exports: [
    TextfieldComponent
  ]
})

export class UiModule { }

