import { Component } from "@angular/core";
import { QuizTemplate } from '../../types/quiz-template';
import { QuizTemplateQuestion } from "../../types/quiz-template-question";
import { of, from } from "rxjs";
import { mergeMap, take, switchMap, tap } from "rxjs/operators";
import { QuizTemplateCreateService } from '../../services/quiz-template-create.service';
  
@Component({
  selector: 'quiz-template',
  templateUrl: 'quiz-template.component.html',
  styleUrls: [ 'quiz-template.component.scss' ]
})

export class QuizTemplateComponent {

  newChoice: string;
  newQuestion: QuizTemplateQuestion;
  template: QuizTemplate;

  constructor(
    private quizTemplateCreateService: QuizTemplateCreateService
  ) {}

  ngOnInit() {
    this.newQuestion = new QuizTemplateQuestion();
    this.template = new QuizTemplate();
    this.template.quizName = "Super Awesome Quiz";
    this.newQuestion.addOption("Good looking");
    this.newQuestion.addOption("Trustworthy");
    this.newQuestion.addOption("Funny");
    this.newQuestion.questionText = "What is {USER}'s best feature?";
    this.addQuestion();
    this.newQuestion.addOption("Good looking");
    this.newQuestion.addOption("Trustworthy");
    this.newQuestion.addOption("Funny");
    this.newQuestion.questionText = "What asdasda {USER}'s?";
    this.addQuestion();
    this.newQuestion.addOption("Good looking");
    this.newQuestion.addOption("Trustworthy");
    this.newQuestion.addOption("Funny");
    this.newQuestion.questionText = "What?";
    this.addQuestion();
  }

  addNewChoice() {
    if (this.newChoice === "") return;
    this.newQuestion.addOption(this.newChoice);
    this.newChoice = "";
  }

  removeChoiceAt(i) {
    this.newQuestion.removeChoiceAt(i);
  }

  addQuestion() {
    if (this.newQuestion.questionText === "" ||
          this.newQuestion.options.length < 2) return;
    const newQuestionCopy = new QuizTemplateQuestion();
    newQuestionCopy.options = this.newQuestion.options;
    newQuestionCopy.questionText = this.newQuestion.questionText;
    this.template.addQuestion(newQuestionCopy);
    this.newQuestion.reset();
  }

  removeQuestionAt(i: number) {
    this.template.removeQuestionAt(i);
  }

  submitTemplate() {
    if (this.template.questions.length < 3) {
      alert("Need at least 3 questions");
      return;
    }
    let sub = this.quizTemplateCreateService.createNewQuizTemplate(this.template.quizName).pipe(
      take(1),
      tap(resp => {
        this.quizTemplateCreateService.setQuizTemplate(resp.body)
      }),
      switchMap(resp => from(this.template.questions)),
      mergeMap((q: QuizTemplateQuestion) => {
        return this.quizTemplateCreateService.addQuestionToQuiz(q, this.quizTemplateCreateService.getQuizTemplate().quizTemplateId);
      })
    ).subscribe(resp => {
      sub.unsubscribe();
    });
  }
  


}
