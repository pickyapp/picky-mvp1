import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { primaryDarkColour, btnSelectedColour } from "src/app/constants";



@Component({
  selector: "click-button",
  templateUrl: "click-button.component.html",
  styleUrls: [ "click-button.component.scss" ]
})

export class ClickButtonComponent implements OnInit {

  @Input('text') buttonText: string = "click-button";
  @Input('isDisabled') isDisabled: boolean;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  bgColour: string;
  boxShadow: string;

  constructor() {}

  ngOnInit () {
    this.isDisabled = this.isDisabled ? this.isDisabled : false;
    this.boxShadow = "0.03rem 0.03rem 1px black"
    this.bgColour = primaryDarkColour;
  }

  didClickButton() {
    if (this.isDisabled) return;
    this.boxShadow = "0.00rem 0.0rem 0px black"
    this.bgColour = btnSelectedColour;
    const s = timer(200).subscribe(
      e => {
        this.bgColour = primaryDarkColour;
        this.boxShadow = "0.03rem 0.03rem 1px black"
        s.unsubscribe();
        
      }
    );
    this.didClick.emit(true);
  }

}
