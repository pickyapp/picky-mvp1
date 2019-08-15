
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InternetService } from 'src/app/services/internet.service';
import { Observable } from 'rxjs';
import { QuizTemplate } from '../types/quiz-template';
import { Quiz } from '../types/quiz';

@Injectable()
export class QuizCreateService extends InternetService {

  // View Type: SELECT_QUIZ_VIEW
  templateList: QuizTemplate[];

  chosenTemplate: QuizTemplate;

  // View Type: ENTER_NAME_VIEW
  
  // View Type: ANSWER_QUIZ_VIEW
  quiz: Quiz;

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
    this.templateList = [];
    this.chosenTemplate = new QuizTemplate();
    this.quiz = new Quiz();
  }

  setTemplateList(quizTemplateList) {
    this.templateList = quizTemplateList.map(t => {
      const newTemplate = new QuizTemplate();
      newTemplate.quizName = t.name;
      newTemplate.quizTemplateId = t.quizTemplateId;
      return newTemplate;
    });
  }

  selectQuizTemplate(i: number) {
    this.chosenTemplate = this.templateList[i];
  }

  setQuiz(quiz) {
    this.quiz.quizId = quiz.quizId;
    this.quiz.quizTemplateId = this.chosenTemplate.quizTemplateId;
  }

  createQuiz(sendObj): Observable<any> {
    return super.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/create`, sendObj, this.httpOptions));
  }

  getQuizTemplates(): Observable<any> {
    return super.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/templates`, this.httpOptions));
  }

  getQuestions(): Observable<any> {
    return super.nPipe(this.httpClient.get(`${this.hostUrl}/quiz/questions/${this.quiz.quizTemplateId}`, this.httpOptions));
  }

  
}
