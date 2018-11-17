import { AnchorComponent } from './anchor/anchor.component';
import { ClickButtonComponent } from './click-button/click-button.component';
import { Header3Component } from './header3/header3.component';
import { NgModule } from "@angular/core";
import { TextfieldComponent } from "./textfield/textfield.component";
import { FormsModule } from "@angular/forms";
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';


@NgModule({
  declarations: [
    AnchorComponent,
    ClickButtonComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    TextfieldComponent
  ],
  imports: [ FormsModule ],
  exports: [
    AnchorComponent,
    ClickButtonComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    TextfieldComponent
  ]
})

export class UiModule { }

