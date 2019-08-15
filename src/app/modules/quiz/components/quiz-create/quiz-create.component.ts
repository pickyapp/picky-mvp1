import { Component } from "@angular/core";
import { QuizCreateService } from '../../services/quiz-create.service';
import { switchMap, tap } from "rxjs/operators";
  
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
      this.viewType = this.SELECT_QUIZ_VIEW;
      let subs = this.qcService.getQuizTemplates().subscribe(resp => {
        this.qcService.setTemplateList(resp.templates);
      });
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
          this.viewType = this.ANSWER_QUIZ_VIEW;
        }),
        switchMap(resp => this.qcService.getQuestions())
      ).subscribe(resp => {
        subs.unsubscribe();
      });
    }
  }
  
