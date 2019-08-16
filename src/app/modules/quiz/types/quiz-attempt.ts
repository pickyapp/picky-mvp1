export class QuizAttempt {

  constructor(
    public attemptId: string = "",
    public quizId: string = "",
    public message: string = "",
    public answerArray: number[] = []
  ) {}
}
