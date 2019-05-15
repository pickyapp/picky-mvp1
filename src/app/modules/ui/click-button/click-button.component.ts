import { Component, Input, Output, EventEmitter } from "@angular/core";
import { timer } from "rxjs";



@Component({
  selector: "click-button",
  templateUrl: "click-button.component.html",
  styleUrls: [ "click-button.component.scss" ]
})

export class ClickButtonComponent {

  @Input('text') buttonText: string = "click-button";
  @Input('isDisabled') isDisabled: boolean;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  private bgColour: string;
  private boxShadow: string;

  constructor() {
    this.isDisabled = this.isDisabled ? this.isDisabled : false;
    this.boxShadow = "0.03rem 0.03rem 1px black"
    this.bgColour = "#00675b";
  }

  didClickButton() {
    if (this.isDisabled) return;
    this.boxShadow = "0.00rem 0.0rem 0px black"
    this.bgColour = "#004c40";
    const s = timer(200).subscribe(
      e => {
        this.bgColour = "#00675b"
        this.boxShadow = "0.03rem 0.03rem 1px black"
        s.unsubscribe();
        
      }
    );
    this.didClick.emit(true);
  }

}
