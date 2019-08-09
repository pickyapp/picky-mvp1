import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Quiz } from "./types/quiz";
import { QuizTemplateQuestion } from "./types/quiz-template-question";



@Injectable()
export class QuizService {

  private readonly hostUrl = environment.apiUrl;
  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };

  private quiz: Quiz;

  constructor(
    private httpClient: HttpClient
  ) {
    this.quiz = new Quiz();
  }

  setQuiz(resp) {
    this.quiz.quizName = resp.newQuiz.name;
    this.quiz.quizTemplateRef = resp.newQuiz.quizTemplateId;
  }

  getQuiz() {
    return this.quiz;
  }

  addQuestionToQuiz(question: QuizTemplateQuestion, quizTemplateRef: string): Observable<any> {
    return this.httpClient.post(`${this.hostUrl}/quiz/add-question`, {
      question: question.getPostBody(),
      quizTemplateRef 
    }, this.httpOptions);
  }

  createNewQuizTemplate(name: string): Observable<any> {
    return this.httpClient.post(`${this.hostUrl}/quiz`, {
      name
    }, this.httpOptions);
  }

}