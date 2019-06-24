import { Component, Input, Output, EventEmitter } from "@angular/core";




@Component({
  selector: "answer",
  templateUrl: "answer.component.html",
  styleUrls: ["answer.component.scss"]
})

export class AnswerComponent {
  @Input("question") question;
  @Input("buddyName") buddyName: string;
  @Input("optionSelected") optionSelected: number;
  @Output('nextClick') nextClick = new EventEmitter<boolean>();


  onNext() {
    this.nextClick.emit(true);
  }
}
