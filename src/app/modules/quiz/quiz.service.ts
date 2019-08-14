import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Quiz } from "./types/quiz";
import { QuizTemplateQuestion } from "./types/quiz-template-question";
import { QuizTemplate } from "./types/quiz-template";



@Injectable()
export class QuizService {

  private readonly hostUrl = environment.apiUrl;
  private httpOptions: object = {
    observe: 'response',
    withCredentials: true // Required for CORS
  };

  private quizTemplate: QuizTemplate;

  constructor(
    private httpClient: HttpClient
  ) {
    this.quizTemplate = new QuizTemplate();
  }

  setQuizTemplate(resp) {
    this.quizTemplate.quizTemplateRef = resp.newQuiz.quizTemplateId;
    this.quizTemplate.quizName = resp.newQuiz.name;
  }

  getQuizTemplate(): QuizTemplate {
    return this.quizTemplate;
  }

  addQuestionToQuiz(question: QuizTemplateQuestion, quizTemplateRef: string): Observable<any> {
    return this.httpClient.post(`${this.hostUrl}/quiz/template/add-question`, {
      question: question.getPostBody(),
      quizTemplateRef 
    }, this.httpOptions);
  }

  createNewQuizTemplate(name: string): Observable<any> {
    return this.httpClient.post(`${this.hostUrl}/quiz/template`, {
      name
    }, this.httpOptions);
  }

}