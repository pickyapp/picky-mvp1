import { Component } from "@angular/core";
import { QuizCreateService } from '../../services/quiz-create.service';
import { switchMap, tap, map } from "rxjs/operators";
  
  @Component({
    selector: 'quiz-create',
    templateUrl: 'quiz-create.component.html',
    styleUrls: [ 'quiz-create.component.scss' ]
  })

  export class QuizCreateComponent {

    readonly ENTER_NAME_VIEW: string = "enter_name_view";
    readonly ANSWER_QUIZ_VIEW: string = "answer_quiz_view";
    readonly SELECT_QUIZ_VIEW: string = "select_quiz_view";
    readonly QUIZ_CREATED_VIEW: string = "quiz_created_view";
    viewType: string;

    userFirstName: string;

    constructor(
      public qcService: QuizCreateService
    ) {}

    ngOnInit() {
      this.userFirstName = "";
      this.viewType = this.SELECT_QUIZ_VIEW; // TODO: temporary
      let subs = this.qcService.getQuizTemplates().subscribe(resp => {
        this.qcService.setTemplateList(resp.templates);
      });
    }

    selectOption(optionIndex: number) {
      this.qcService.updateAnswerMatrix(optionIndex);
      if (this.qcService.isFinishedAnswering) {
        this.qcService.postAnswerMatrix().subscribe(body => {
          this.viewType = this.QUIZ_CREATED_VIEW;
        });
        return;
      }
    }

    selectTemplateAt(i: number) {
      this.qcService.selectQuizTemplate(i);
      this.viewType = this.ENTER_NAME_VIEW;
    }

    createQuiz() {
      if (this.userFirstName === "") return;
      const subs = this.qcService.createQuiz({
        user: this.userFirstName,
        quizTemplateId: this.qcService.chosenTemplate.quizTemplateId
      }).pipe(
        tap(resp => {
          this.qcService.setQuiz(resp);
        }),
        switchMap(resp => this.qcService.getQuestions())
      ).subscribe(body => {
        this.qcService.setQuestions(body.questions);
        this.viewType = this.ANSWER_QUIZ_VIEW;
        subs.unsubscribe();
      });
    }
  }
  
