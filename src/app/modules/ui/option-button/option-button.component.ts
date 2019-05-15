import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
  selector: "option-button",
  templateUrl: "option-button.component.html",
  styleUrls: [ "option-button.component.scss" ]
})

export class OptionButtonComponent {

  @Input('text') buttonText: string = "option-button";
  @Input('isDisabled') isDisabled: boolean;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  didClickButton() {
    this.didClick.emit(true);
  }

}
