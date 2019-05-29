import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { timer } from "rxjs";



@Component({
  selector: "option-button",
  templateUrl: "option-button.component.html",
  styleUrls: [ "option-button.component.scss" ]
})

export class OptionButtonComponent implements OnInit {

  @Input('text') buttonText: string = "option-button";
  @Input('isDisabled') isDisabled: boolean;
  @Input('isSelected') isSelected: boolean;
  @Output('didClick') didClick = new EventEmitter<boolean>();

  bgColour: string;
  boxShadow: string;

  ngOnInit () {
    this.isDisabled = this.isDisabled ? this.isDisabled : false;
    this.bgColour = this.isDisabled ?
      this.isSelected ? "#303F9F" : "#a4a4a4"
        : "#4db6ac";
    this.boxShadow = "0.03rem 0.03rem 1px black";
  }

  didClickButton() {
    if (this.isDisabled) return;
    this.boxShadow = "0.00rem 0.0rem 0px black"
    this.bgColour = "#00867d";
    const s = timer(300).subscribe(
      e => {
        this.bgColour = "#4db6ac"
        this.boxShadow = "0.03rem 0.03rem 1px black"
        s.unsubscribe();
        
      }
    );
    this.didClick.emit(true);
  }

}
