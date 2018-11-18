import { Component, Input } from "@angular/core";



@Component({
  selector: "click-button",
  templateUrl: "click-button.component.html",
  styleUrls: [ "click-button.component.scss" ]
})

export class ClickButtonComponent {

  @Input('text') buttonText: string = "click-button";

}
