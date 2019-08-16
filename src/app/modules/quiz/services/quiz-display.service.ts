import { Injectable } from "@angular/core";
import { InternetService } from "src/app/services/internet.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Quiz } from "../types/quiz";
import { QuizTemplate } from '../types/quiz-template';
import { QuizTemplateQuestion } from '../types/quiz-template-question';
import { QuizAttempt } from "../types/quiz-attempt";



@Injectable()
export class QuizDisplayService extends InternetService {

  quiz: Quiz;
  quizTemplate: QuizTemplate;
  quizAttempt: QuizAttempt;
  answers: number[];

  attemptScore: number;
  attemptPercentage: number;
  
  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
    this.quiz = new Quiz();
    this.quizTemplate = new QuizTemplate();
    this.quizAttempt = new QuizAttempt();
    this.answers = [];
    this.attemptScore = 0;
    this.attemptPercentage = 0;
  }

  setQuiz(quiz) {
    this.quiz.answerMatrix = quiz.answerMatrix;
    this.quiz.quizId = quiz.quizId;
    this.quiz.quizTemplateId = quiz.quizTemplateId;
    this.quiz.userFirstName = quiz.userFirstName;
  }

  setQuizTemplate(quizTemplate) {
    this.quizTemplate.quizName = quizTemplate.name;
    this.quizTemplate.quizTemplateId = quizTemplate.quizTemplateId;
    this.quizTemplate.totalPoints = quizTemplate.totalPoints;
  }

  setQuizTemplateQuestions(questions) {
    this.quizTemplate.questions = questions.map(q =>
      new QuizTemplateQuestion(q.questionText, q.options));
  }

  setQuizAttempt(quizAttempt) {
    this.quizAttempt.attemptId = quizAttempt.quizAttemptId;
    this.quizAttempt.quizId = quizAttempt.quizId;
  }

  setAttemptRank(rank: number) {
    this.quizAttempt.rank = rank;
  }

  addAnswer(i: number) {
    this.quizAttempt.answerArray.push(i);
  }

  calculateAttemptScore() {
    this.quiz.answerMatrix.forEach((arr, i) => {
      this.attemptScore += arr[this.quizAttempt.answerArray[i]];
    });
    this.attemptPercentage = Math.round((this.attemptScore / this.quizTemplate.totalPoints) * 100);
  }

  getQuiz(quizId): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/quizzes/${quizId}`, this.httpOptions));
  }
  
  getQuizTemplate(): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/templates/${this.quiz.quizTemplateId}`, this.httpOptions));
  }

  getQuizTemplateQuestions(): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/questions/${this.quiz.quizTemplateId}`, this.httpOptions));
  }

  createQuizAttempt(): Observable<any> {
    return this.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/create/quiz-attempt`, {
      quizId: this.quiz.quizId
    }, this.httpOptions));
  }

  postAnswersToQuizAttempt(): Observable<any> {
    return this.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/attempt/update-answers`, {
      answerArray: this.quizAttempt.answerArray,
      quizAttemptId: this.quizAttempt.attemptId,
      score: this.attemptPercentage
    }, this.httpOptions));
  }

  getAttemptRank(): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/attempt/rank-by-attempt-id/${this.quizAttempt.attemptId}`, this.httpOptions));
  }
}
