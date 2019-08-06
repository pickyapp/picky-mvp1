import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";





@Component({
  selector: "question",
  templateUrl: "question.component.html",
  styleUrls: ["question.component.scss"]
})

export class QuestionComponent implements OnChanges {
  @Input("buddyName") buddyName: string;
  @Input("question") question;
  @Output('answerClick') answerClick = new EventEmitter<number>();
  @Input('canClickAnswers') canClickAnswers: boolean;

  constructor() {
    this.canClickAnswers = true;
  }

  ngOnChanges() {
    this.question.questionText = this.question.questionText.replace(/{USER}/g, this.buddyName);
  }

  optionClicked(i: number) {
    this.answerClick.emit(i);
  }
}