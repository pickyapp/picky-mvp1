import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { GameSessionService } from "src/app/services/game-session.service";
import { switchMap, take, tap, filter, map } from "rxjs/operators";
import { timer, interval, Observable, of } from "rxjs";
import { TimerComponent } from "src/app/modules/ui/timer/timer.component";
import { UtilityService } from "../../services/utility.service";
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: "in-game",
  templateUrl: "in-game.component.html",
  styleUrls: ["in-game.component.scss"]
})

export class InGameComponent implements AfterViewInit {

  @ViewChild("gameTimer")
  private gameTimerComponent: TimerComponent;

  private readonly QUESTION_VIEW_TIME: number = 45000;
  private readonly QUESTION_TIMER_TYPE: string = "question_timer";
  private readonly ANSWER_VIEW_TIME: number = 45000;
  private readonly ANSWER_TIMER_TYPE: string = "answer_timer";
  private currTimerType: string;
  private readonly TOTAL_ROUNDS: number = 5;

  round: number;

  private timerTimeLeft: number;

  private buddyName: string = "Himani";
  typeString: string;
  currQuestion; // FIXME: temp
  private currOptionSelected: number;

  // UI
  isShowingAnswers: boolean;
  private canClickAnswers: boolean;



  ngOnInit() {
    this.typeString = "QUESTION";
    this.isShowingAnswers = false;
  }
  ngAfterViewInit() {
    this.startRound();
  }

  constructor(
    private cookieService: CookieService,
    private gsService: GameSessionService,
    private utilityService: UtilityService
  ) {
    this.isShowingAnswers = false;
    this.setBuddyNameFromCookie();
    this.round = 0;
    this.currOptionSelected = 1;
  }

  setAnswerAs(i) {
    this.currOptionSelected = i;
    if (!this.isShowingAnswers) {
      this.canClickAnswers = false;
      this.onNext();
    }
  }

  startRound() {
    const s = this.gsService.getQuestion()
    .pipe(
      filter(resp => resp.body.message === "success"),
      take(1)
    ).subscribe(resp => {
        s.unsubscribe();
        this.isShowingAnswers = false;
        this.canClickAnswers = true;
        this.round++;
        this.currQuestion = this.getQuestionFromCookie(true);
        this.typeString = "QUESTION";
        this.currTimerType = this.QUESTION_TIMER_TYPE;
        this.startTimer(this.QUESTION_VIEW_TIME, this.currTimerType);
    });
  }

  getQuestionFromCookie(amIAnswerer: boolean): object {
    const c = JSON.parse(atob(this.cookieService.get("user")));
    const currUser = c.user;
    const question = c.game_session.questions.filter(
      el => (amIAnswerer && !el.isAnswered) ? (el.answerer === c.user.username) :
                          el.answerer !== c.user.username)[0];
    try {
      question.question.questionText = question.question.questionText.replace('{USER}',
        amIAnswerer ? this.buddyName : currUser.username);
    } catch (e) {
      console.log({
        round: this.round,
        qORa: amIAnswerer ? "question" : "answer",
        question: question
      })
      console.log(e);
    }
    return question;
  }

  onTimerFinished(timerType: string) {
    if (timerType === this.QUESTION_TIMER_TYPE) {
      this.onQuestionTimerFinished();
      return;
    }
    this.onAnswerTimerFinished();
  }

  onNext() {
    this.gameTimerComponent.stopTimer();
    this.onTimerFinished(this.currTimerType);
  }

  onQuestionTimerFinished() {
    const s = this.gsService.postMyAnswer(this.currOptionSelected)
      .subscribe(resp => {
        s.unsubscribe();
        this.pollForBuddyAnswer();
      });
  }

  onAnswerReceived(resp) {
    this.isShowingAnswers = true;
    const ques: any = this.getQuestionFromCookie(false);
    this.typeString = this.buddyName + " says:"
    this.setAnswerAs(ques.answer);
    this.currQuestion = ques;
    this.currTimerType = this.ANSWER_TIMER_TYPE;
    this.startTimer(this.ANSWER_VIEW_TIME, this.ANSWER_TIMER_TYPE);
  }

  onAnswerTimerFinished() {
    if (this.round === this.TOTAL_ROUNDS) { // TODO: change to 10 rounds
      alert("Game over!");
      return;
    }
    this.startRound();
  }

  pollForBuddyAnswer() {
    // TODO: maybe we can start a UI loading circle here or something?
    const my_s = this.utilityService.getPoller(
      1000,
      (e) => this.gsService.getBuddyAnswer(),
      (resp) => {
        const question: any = this.getQuestionFromCookie(false);
        return question && question.isAnswered;
      }
    ).subscribe(resp => {
      my_s.unsubscribe();
      this.onAnswerReceived(resp);
    });
  }

  startTimer(time: number, timerType: string) {
    this.gameTimerComponent.setTime(time);
    this.gameTimerComponent.setTimerType(timerType);
    this.gameTimerComponent.startTimer();
  }

  setBuddyNameFromCookie() {
    const c = JSON.parse(atob(this.cookieService.get("user")));
    this.buddyName = c.game_session.users.filter(el => el !== c.user.username)[0];
  }

  /**
   * @TEMPORARY
   */
  showCookieValue(cookieName: string) {
    var this_user = JSON.parse(atob(this.cookieService.get(cookieName)));
    console.log(this_user);
  }

  ngOnDestroy() {
    // TODO: destroy all subscribers
  }

}
