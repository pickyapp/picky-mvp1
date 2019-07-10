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
    this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
    this.bgColour = "linear-gradient(-45deg, #0a00b6, #304ffe)";// primaryDarkColour;
  }

  ngOnChanges() {
    this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
  }

  didClickButton() {
    if (this.isDisabled) return;
    this.boxShadow = "0.00rem 0.0rem 0px black"
    this.bgColour = "linear-gradient(-45deg, #0a00b6, #0a00b6)";
    const s = timer(200).subscribe(
      e => {
        this.bgColour = primaryDarkColour;
        this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
        this.didClick.emit(true);
        s.unsubscribe();
        
      }
    );
  }

}
