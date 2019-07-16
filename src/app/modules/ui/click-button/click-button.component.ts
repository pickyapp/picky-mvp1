import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { primaryDarkColour, btnSelectedColour, clickBtnSelectedColour, clickBtnColour, disabledColour, tipBtnColour, tipBtnSelectedColour } from "src/app/constants";



@Component({
  selector: "click-button",
  templateUrl: "click-button.component.html",
  styleUrls: [ "click-button.component.scss" ]
})

export class ClickButtonComponent implements OnInit {

  @Input('text') buttonText: string = "click-button";
  @Input('btnType') btnType: number = 0; // 0: normal style, 1: tip button
  @Input('isDisabled') isDisabled: boolean;
  @Input('textSize') textSize: string;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  backgroundColour: string;
  selectedBackgroundColour: string;

  bgColour: string;
  boxShadow: string;

  constructor() {}

  ngOnInit () {
    this.backgroundColour = this.btnType === 0 ? clickBtnColour : tipBtnColour;
    this.selectedBackgroundColour = this.btnType === 0 ? clickBtnSelectedColour : tipBtnSelectedColour;
    this.isDisabled = this.isDisabled ? this.isDisabled : false;
    this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
    this.bgColour = this.isDisabled ? disabledColour : this.backgroundColour;
    this.textSize = this.textSize ? this.textSize : this.btnType ? 'f5': 'f2';
  }

  ngOnChanges() {
    this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
    this.bgColour = this.isDisabled ? disabledColour : this.backgroundColour;
  }

  didClickButton() {
    if (this.isDisabled) return;
    this.boxShadow = "0.00rem 0.0rem 0px black"
    this.bgColour = this.selectedBackgroundColour;
    const s = timer(200).subscribe(
      e => {
        this.bgColour = this.backgroundColour;
        this.boxShadow = this.isDisabled ? "" : "0.1rem 0.1rem 1px black";
        this.didClick.emit(true);
        s.unsubscribe();
        
      }
    );
  }

}
