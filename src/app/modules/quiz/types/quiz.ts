

export class Quiz {
  quizId: string;
  quizTemplateId: string;
  userFirstName: string;
  answerMatrix: number[][];

  constructor() {
    this.quizId = "";
    this.quizTemplateId = "";
    this.userFirstName = "";
    this.answerMatrix = [];
  }
};

