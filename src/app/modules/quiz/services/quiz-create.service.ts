
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InternetService } from 'src/app/services/internet.service';
import { Observable } from 'rxjs';
import { QuizTemplate } from '../types/quiz-template';
import { Quiz } from '../types/quiz';
import { QuizTemplateQuestion } from '../types/quiz-template-question';
import { map } from 'rxjs/operators';

@Injectable()
export class QuizCreateService extends InternetService {

  // View Type: SELECT_QUIZ_VIEW
  templateList: QuizTemplate[];

  chosenTemplate: QuizTemplate;

  // View Type: ENTER_NAME_VIEW
  questions: QuizTemplateQuestion[];
  answerMatrix: number[][];
  qIndex: number;
  optionRank: number; // optionRank: when we click on an option, this value increments. Value reset to 0 when new question to answer
  isFinishedAnswering: boolean;

  // View Type: ANSWER_QUIZ_VIEW

  quiz: Quiz;

  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
    this.templateList = [];
    this.questions = [];
    this.answerMatrix = [];
    this.chosenTemplate = new QuizTemplate();
    this.quiz = new Quiz();
    this.qIndex = 0;
    this.optionRank = 0;
    this.isFinishedAnswering = false;
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
    console.log("Quiz: ", quiz);
    this.quiz.quizId = quiz.quizId;
    this.quiz.quizTemplateId = this.chosenTemplate.quizTemplateId;
  }

  setQuestions(questions) {
    this.questions = questions.map(q => new QuizTemplateQuestion(q.questionText, q.options));
    this.qIndex = 0;
    this.setAnswerMatrix();
  }

  setAnswerMatrix() {
    for(let i = 0; i < this.questions.length; i++) {
      this.answerMatrix.push((new Array(this.questions[i].options.length)).fill(-1));
    }
    this.optionRank = this.answerMatrix[this.qIndex].length;
  }

  updateAnswerMatrix(optionIndex: number) {
    this.answerMatrix[this.qIndex][optionIndex] = this.optionRank;
    --this.optionRank;
    if (!this.optionRank) this.loadNextQuestion();
  }

  loadNextQuestion() {
    if (this.qIndex === (this.answerMatrix.length - 1)) {
      this.isFinishedAnswering = true;
      return;
    }
    ++this.qIndex;
    this.optionRank = this.answerMatrix[this.qIndex].length;
  }

  postAnswerMatrix(): Observable<any> {
    return super.nPipe(this.httpClient.post(`${this.hostUrl}/quiz/answer-matrix`, {
      quizId: this.quiz.quizId, answerMatrix: this.answerMatrix
    }, this.httpOptions));
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
