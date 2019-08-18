import { Injectable } from "@angular/core";
import { InternetService } from "../../../services/internet.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Quiz } from "../types/quiz";
import { QuizResult } from '../types/quiz-result';



@Injectable()
export class QuizOwnerService extends InternetService {


  quiz: Quiz;
  results: QuizResult[];
  avgScore: number;
  attemptAmount: number;
  
  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
    this.quiz = new Quiz();
    this.avgScore = 0;
    this.attemptAmount = 0;
  }

  setQuiz(quiz) {
    this.quiz.quizId = quiz.quizId;
    this.quiz.quizTemplateId = quiz.quizTemplateId;
    this.quiz.userFirstName = quiz.userFirstName;
    this.quiz.answerMatrix = quiz.answerMatrix;
  }

  setResults(results) {
    let totalScore = 0;
    this.results = results.map(r => {
      totalScore += r.score;
      return new QuizResult(r.message, r.score, r.isResultSeen);
    });
    this.attemptAmount = this.results.length;
    this.avgScore = Math.round(totalScore / this.attemptAmount);
  }

  resetResultValues() {
    this.attemptAmount = 0;
    this.avgScore = 0;
    this.results = [];
  }

  getQuiz(quizId): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/quizzes/${quizId}`, this.httpOptions));
  }

  login(userPasswordHash1): Observable<any> {
    return this.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/authenticate`, {
      quizId: this.quiz.quizId,
      userPasswordHash1
    }, this.httpOptions));
  }

  logout(): Observable<any> {
    return this.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/logout`, {}, this.httpOptions));
  }

  getAggregateResults(): Observable<any> {
    return this.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/owner/results/${this.quiz.quizId}`, this.httpOptions));
  }

}