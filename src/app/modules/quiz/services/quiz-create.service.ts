
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InternetService } from 'src/app/services/internet.service';
import { Observable } from 'rxjs';
import { QuizTemplate } from '../types/quiz-template';
import { Quiz } from '../types/quiz';
import { QuizTemplateQuestion } from '../types/quiz-template-question';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  user: string;

  // View Type: ANSWER_QUIZ_VIEW

  // View Type: QUIZ_CREATED_VIEW
  quizLink: string;

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
    this.user = "";
    this.quizLink = environment.domain + "/quiz";
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
    this.quizLink += "/" + this.quiz.quizId;
    console.log("Set quiz... ", this.quiz);
  }

  setQuestions(questions) {
    this.questions = questions.map(q => new QuizTemplateQuestion(q.questionText.replace(/{USER}/g, this.user), q.options));
    this.qIndex = 0;
    console.log("Set questions...", this.questions);
    this.setAnswerMatrix();
  }

  setUserName(user: string) {
    this.user = user;
  }

  setAnswerMatrix() {
    for(let i = 0; i < this.questions.length; i++) {
      this.answerMatrix.push((new Array(this.questions[i].options.length)).fill(-1));
    }
    console.log("Initiating answer matrix", this.answerMatrix);
    this.optionRank = this.answerMatrix[this.qIndex].length;
  }

  updateAnswerMatrix(optionIndex: number) {
    this.answerMatrix[this.qIndex][optionIndex] = this.optionRank;
    console.log("Updated answer matrix", this.answerMatrix);
    console.log("Option rank: ", this.optionRank);
    --this.optionRank;
    if (!this.optionRank) this.loadNextQuestion();
  }

  loadNextQuestion() {
    if (this.qIndex === (this.answerMatrix.length - 1)) {
      console.log("Finished answering: ", this.qIndex);
      this.isFinishedAnswering = true;
      return;
    }
    ++this.qIndex;
    console.log("Loading next question, optionRank: ", this.optionRank);
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
