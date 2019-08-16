import { QuizTemplateQuestion } from './quiz-template-question';

export class QuizTemplate {
  quizName: string;
  questions: QuizTemplateQuestion[];
  quizTemplateId: string;
  totalPoints: number;

  constructor(questions: QuizTemplateQuestion[] = []) {
    this.quizName = "";
    this.questions = questions;
    this.quizTemplateId = "";
    this.totalPoints = 0;
  }

  addQuestion(question: QuizTemplateQuestion) {
    this.questions.push(question);
  }

  removeQuestionAt(i: number) {
    this.questions.splice(i, 1);
  }
}
