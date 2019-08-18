export class QuizResult {
  constructor(
    public message: string = "",
    public score: number = 0,
    public isResultSeen: boolean = false
  ) {}
}
