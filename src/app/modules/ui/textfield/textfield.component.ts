import { Component, Input, Output, EventEmitter } from "@angular/core";




@Component({
  selector: "textfield",
  templateUrl: "textfield.component.html",
  styleUrls: [ "textfield.component.scss" ]
})

export class TextfieldComponent {
  @Input("placeholderText") placeholderText: string;
  @Input("textValue") textValue: string;
  @Input("isDisabled") isDisabled: boolean;
  @Input("textSize") textSize = "f6";
  @Input("inputType") inputType = "";
  @Output() textValueChange = new EventEmitter<string>();

  ngOnChanges() {
    this.inputType = this.inputType ? this.inputType : "";
  }

  emit(val: string) {
    this.textValue = val;
    this.textValueChange.emit(this.textValue);
  }
}
