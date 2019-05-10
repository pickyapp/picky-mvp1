import { Component, Input, Output, EventEmitter } from "@angular/core";




@Component({
  selector: "textfield",
  templateUrl: "textfield.component.html",
  styleUrls: [ "textfield.component.scss" ]
})

export class TextfieldComponent {
  @Input("placeholderText") private placeholderText: string;
  @Input("textValue") private textValue: string;
  @Input("isDisabled") private isDisabled: boolean;
  @Input("textSize") private fontSize = "f6;"
  @Output() private textValueChange = new EventEmitter<string>();


  emit(val: string) {
    this.textValue = val;
    this.textValueChange.emit(this.textValue);
  }
}
