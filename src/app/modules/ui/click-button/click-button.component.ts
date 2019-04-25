import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
  selector: "click-button",
  templateUrl: "click-button.component.html",
  styleUrls: [ "click-button.component.scss" ]
})

export class ClickButtonComponent {

  @Input('text') buttonText: string = "click-button";
  @Input('isDisabled') isDisabled: boolean;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  didClickButton() {
    this.didClick.emit(true);
  }

}
