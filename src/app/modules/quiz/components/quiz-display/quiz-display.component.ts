import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { take, switchMap, tap } from "rxjs/operators";
import { QuizDisplayService } from "../../services/quiz-display.service";
import confetti from "canvas-confetti";
import { interval } from "rxjs";
  
  @Component({
    selector: 'quiz-display',
    templateUrl: 'quiz-display.component.html',
    styleUrls: [ 'quiz-display.component.scss' ]
  })

  export class QuizDisplayComponent {
    readonly QUIZ_TITLE_PAGE_VIEW: string = "quiz_title_page_view";
    readonly QUIZ_GAMEPLAY_VIEW: string = "quiz_gameplay_view";
    readonly QUIZ_RESULTS_VIEW: string = "quiz_results_view";
    viewType: string;

    currQuestionIndex: number;
    canClickAnswers: boolean;

    isQuizResultsConfettiStarted: boolean;

    constructor(
      private route: ActivatedRoute,
      public qdService: QuizDisplayService
    ) {}

    ngOnInit() {
      this.viewType = this.QUIZ_TITLE_PAGE_VIEW;
      this.currQuestionIndex = 0;
      this.canClickAnswers = true;
      this.isQuizResultsConfettiStarted = false;
      let subs = this.route.params.pipe(
        take(1),
        switchMap(params => this.qdService.getQuiz(params["quizId"])),
        take(1),
        tap(resp => this.qdService.setQuiz(resp)),
        switchMap(resp => this.qdService.getQuizTemplate()),
        take(1),
        tap(resp => this.qdService.setQuizTemplate(resp)),
        switchMap(resp => this.qdService.getQuizTemplateQuestions()),
        take(1),
        tap(resp => this.qdService.setQuizTemplateQuestions(resp.questions)),
        switchMap(resp => this.qdService.createQuizAttempt()),
        take(1)
      ).subscribe(resp => {
        this.qdService.setQuizAttempt(resp);
        subs.unsubscribe();
      });
    }

    onAnswer(i: number) {
      this.canClickAnswers = false;
      this.qdService.addAnswer(i);
      if ((this.currQuestionIndex+1) === this.qdService.quizTemplate.questions.length) {
        this.qdService.calculateAttemptScore();
        let subs = this.qdService.postAnswersToQuizAttempt().pipe(
          switchMap(resp => this.qdService.getAttemptRank())
        ).subscribe(resp => {
          console.log(resp);
          this.qdService.setAttemptRank(resp.rank);
          this.viewType = this.QUIZ_RESULTS_VIEW;
          subs.unsubscribe();
        });
        return;
      }
      ++this.currQuestionIndex;
      this.canClickAnswers = true;
    }

    goToOwnerPage() {
      console.log("TODO");
    }

    startQuizAttempt() {
      this.viewType = this.QUIZ_GAMEPLAY_VIEW;
    }

    showQuizResultsConfetti() {
      if (this.isQuizResultsConfettiStarted) return;
      this.isQuizResultsConfettiStarted = true;
      interval(this.qdService.quizAttempt.rank < 5 ? 200 : 800).subscribe(pop => {
        confetti({
          startVelocity: this.qdService.quizAttempt.rank < 5 ? 30 : 10,
          spread: 360,
          ticks: this.qdService.quizAttempt.rank < 5 ? 300 : 60,
          shapes: ['square'],
          origin: {
              x: Math.random(),
              y: Math.random() - 0.2
          }
        });
      });
    }
  }
  
