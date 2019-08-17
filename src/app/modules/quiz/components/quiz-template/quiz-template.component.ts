import { Component } from "@angular/core";
import { QuizTemplate } from '../../types/quiz-template';
import { QuizTemplateQuestion } from "../../types/quiz-template-question";
import { from } from "rxjs";
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
    public quizTemplateCreateService: QuizTemplateCreateService
  ) {}

  ngOnInit() {
    this.newQuestion = new QuizTemplateQuestion();
    this.template = new QuizTemplate();
    this.template.quizName = "Basic Quiz";
    this.newQuestion.questionText = "What kind of movie would {USER} watch on a Friday night?";
    this.newQuestion.options = [
      "Horror",
      "Rom-com",
      "Action",
      "Drama"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "{USER} wants a:";
    this.newQuestion.options = [
      "BMW",
      "Tesla",
      "Mercedes",
      "Rolls Royce"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "{USER}'s favourite quote is:";
    this.newQuestion.options = [
      "Work hard, play hard",
      "You only live once",
      "To be old and wise, you must be young and stupid"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "In school, {USER} would prefer to be a:";
    this.newQuestion.options = [
      "Librarian",
      "Gym teacher",
      "Math teacher",
      "English teacher"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "After winning a lottery, {USER} prefers to:";
    this.newQuestion.options = [
      "Travel",
      "Shop fashion",
      "Buy the latest tech",
      "Visit gourmet restaurants"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "Which exotic pet would {USER} adopt?";
    this.newQuestion.options = [
      "Snake",
      "Lion",
      "Shark",
      "Panda"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "{USER}'s pet peeve is:";
    this.newQuestion.options = [
      "Someone chewing loudly",
      "Bitter cold weather",
      "An unsafe driver",
      "Hunger"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "{USER} fears ____ the most:";
    this.newQuestion.options = [
      "Heights",
      "Insects",
      "Losing their phone"
    ];
    this.addQuestion();
    this.newQuestion.questionText = "In a fantasy, {USER} is a famous:";
    this.newQuestion.options = [
      "Rapper",
      "Vlogger",
      "Moviestar",
      "Model"
    ];
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
    let subCount = 0;
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
      subCount++;
      if (subCount === this.template.questions.length) sub.unsubscribe();
    });
  }
  


}
