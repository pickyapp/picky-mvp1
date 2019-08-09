import { QuizTemplateQuestion } from './quiz-template-question';

export class QuizTemplate {
  quizName: string;
  questions: QuizTemplateQuestion[];

  constructor(questions: QuizTemplateQuestion[] = []) {
    this.quizName = "";
    this.questions = questions;
  }

  addQuestion(question: QuizTemplateQuestion) {
    this.questions.push(question);
  }

  removeQuestionAt(i: number) {
    this.questions.splice(i, 1);
  }
}
