import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap, tap } from "rxjs/operators";
import { QuizDisplayService } from "../../services/quiz-display.service";
import confetti from "canvas-confetti";
import { interval, timer } from "rxjs";
import ordinal from "ordinal";
  
  @Component({
    selector: 'quiz-display',
    templateUrl: 'quiz-display.component.html',
    styleUrls: [ 'quiz-display.component.scss' ]
  })

  export class QuizDisplayComponent {
    readonly QUIZ_TITLE_PAGE_VIEW: string = "quiz_title_page_view";
    readonly QUIZ_GAMEPLAY_VIEW: string = "quiz_gameplay_view";
    readonly QUIZ_RESULTS_VIEW: string = "quiz_results_view";
    readonly SEND_MESSAGE_VIEW: string = "send_message_view";
    viewType: string;

    @ViewChild("preQuizTimer")
    private preQuizTimer;

    inQuizRankInfo: string;
    currQuestionIndex: number;
    questionProgress: number;
    canClickAnswers: boolean;

    isQuizResultsConfettiStarted: boolean;
    showQuizResultNextButton: boolean;
    messageToQuizOwner: string;
    
    sendMessageBtnText: string;
    isSendMessageBtnDisabled: boolean;

    constructor(
      private route: ActivatedRoute,
      public qdService: QuizDisplayService,
      private router: Router
    ) {}

    ngOnInit() {
      this.viewType = this.QUIZ_TITLE_PAGE_VIEW;
      this.currQuestionIndex = 0;
      this.canClickAnswers = true;
      this.isQuizResultsConfettiStarted = false;
      this.showQuizResultNextButton = false;
      this.messageToQuizOwner = "";
      this.sendMessageBtnText = "Send";
      this.isSendMessageBtnDisabled = false;
      this.questionProgress = 0;
      this.inQuizRankInfo = "";
      let subs = this.route.params.pipe(
        take(1),
        switchMap(params => this.qdService.getQuiz(params["quizId"])),
        take(1),
        tap(resp => this.qdService.setQuiz(resp)),
        switchMap(resp => this.qdService.getQuizTemplate()),
        take(1),
        tap(resp => this.qdService.setQuizTemplate(resp)),
        switchMap(resp => this.qdService.getQuizTemplateQuestions()),
      ).subscribe(resp => {
        this.qdService.setQuizTemplateQuestions(resp.questions);
        this.preQuizTimer.setTime(2000);
        this.preQuizTimer.setTimerType("QUIZ_START_TIMER");
        this.preQuizTimer.startTimer();
        subs.unsubscribe();
      });
    }

    onAnswer(i: number) {
      this.canClickAnswers = false;
      ++this.questionProgress;
      this.qdService.addAnswer(i);
      this.qdService.calculateAttemptScore();
      let subs2 = this.qdService.postAnswerToQuizAttempt().subscribe(resp => {
        this.canClickAnswers = true;
        if (resp.rank < this.qdService.quizAttempt.rank) {
          this.popConfetti();
        }
        this.qdService.setAttemptRank(resp.rank);
        this.qdService.setAttemptAmount(resp.attemptAmount);
        this.inQuizRankInfo = `Rank ${ordinal(this.qdService.quizAttempt.rank)} of ${this.qdService.attemptAmount}`;
        console.log(resp);
        subs2.unsubscribe();
      });
      if ((this.currQuestionIndex+1) === this.qdService.quizTemplate.questions.length) {
        this.qdService.calculateAttemptScore();
        let subs = this.qdService.getAttemptRank().subscribe(resp => {
          this.qdService.setAttemptRank(resp.rank);
          this.viewType = this.QUIZ_RESULTS_VIEW;
          subs.unsubscribe();
        });
        return;
      }
      ++this.currQuestionIndex;
    }

    goToOwnerPage() {
      this.router.navigate([`/quiz/${this.qdService.quiz.quizId}/owner`]);
    }

    startQuizAttempt() {
      if (this.qdService.isQuizStarted) return;
      this.qdService.isQuizStarted = true;
      let s = this.qdService.createQuizAttempt().subscribe(resp => {
        this.qdService.setQuizAttempt(resp);
        this.viewType = this.QUIZ_GAMEPLAY_VIEW;
      });
    }

    showQuizResultsConfetti() {
      if (this.isQuizResultsConfettiStarted) return;
      this.isQuizResultsConfettiStarted = true;
      let s2 = interval(this.qdService.quizAttempt.rank < 5 ? 200 : 800).subscribe(popAmount => {
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
        if (popAmount > 20) s2.unsubscribe();
      });
    }

    popConfetti() {
      confetti({
        startVelocity: 20,
        spread: 70,
        ticks: 50,
        shapes: ['square'],
        origin: {
            x: 0.5,
            y: 0.2
        }
      });
    }

    goToSendMessageView() {
      this.viewType = this.SEND_MESSAGE_VIEW;
    }

    onSendMessage() {
      let s = this.qdService.sendMessage(this.messageToQuizOwner).subscribe(resp => {
        this.isSendMessageBtnDisabled = true;
        this.sendMessageBtnText = "Sent!";
      });
    }

    goToCreateQuiz() {
      this.router.navigate(['/quiz/create']);
    }
  }
  
