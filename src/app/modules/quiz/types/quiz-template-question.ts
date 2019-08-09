export class QuizTemplateQuestion {
  questionText: string;
  options: string[];

  constructor() {
    this.questionText = "";
    this.options = [];
  }

  addOption(option: string) {
    this.options.push(option);
  }

  removeChoiceAt(i: number) {
    this.options.splice(i, 1);
  }

  reset() {
    this.questionText = "";
    this.options = [];
  }

  getPostBody() {
    return {
      questionText: this.questionText,
      options: this.options
    };
  }
}
