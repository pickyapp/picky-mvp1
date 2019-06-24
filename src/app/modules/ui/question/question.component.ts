import { Component, Input, Output, EventEmitter } from "@angular/core";





@Component({
  selector: "question",
  templateUrl: "question.component.html",
  styleUrls: ["question.component.scss"]
})

export class QuestionComponent {
  @Input("buddyName") buddyName: string;
  @Input("question") question;
  @Output('answerClick') answerClick = new EventEmitter<number>();

  private canClickAnswers: boolean;

  constructor() {
    this.canClickAnswers = true;
  }

  optionClicked(i: number) {
    this.canClickAnswers = false;
    this.answerClick.emit(i);
  }
}