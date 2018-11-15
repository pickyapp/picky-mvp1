import { Component, Input, Output, EventEmitter } from "@angular/core";




@Component({
  selector: "textfield",
  templateUrl: "textfield.component.html",
  styleUrls: [ "textfield.component.scss" ]
})

export class TextfieldComponent {
  @Input("placeholderText") private placeholderText: String;
  @Input("textValue") private textValue: String;
  @Output() textValueChange = new EventEmitter<String>();


  emit(val: String) {
    this.textValue = val;
    this.textValueChange.emit(this.textValue);
  }
}
