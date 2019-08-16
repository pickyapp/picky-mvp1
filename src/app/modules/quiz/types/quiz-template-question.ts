export class QuizTemplateQuestion {

  constructor(
    public questionText: string = "",
    public options: string[] = []
  ) {}

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
