import { Component, AfterViewInit } from "@angular/core";
import { GameSessionService } from "src/app/services/game-session.service";
import { take, filter } from "rxjs/operators";
import { UtilityService } from "../../services/utility.service";
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";




@Component({
  selector: "in-game",
  templateUrl: "in-game.component.html",
  styleUrls: ["in-game.component.scss"]
})

export class InGameComponent implements AfterViewInit {

  private readonly QUESTION_SCREEN_TYPE: string = "question_screen";
  private readonly ANSWER_SCREEN_TYPE: string = "answer_screen";
  private currScreenType: string;
  private readonly TOTAL_ROUNDS: number = 5;

  round: number;

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
    private utilityService: UtilityService,
    private loadingSpinnerService: NgxSpinnerService
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
        this.currScreenType = this.QUESTION_SCREEN_TYPE;
    });
  }

  getQuestionFromCookie(amIAnswerer: boolean): object {
    const c = JSON.parse(atob(this.cookieService.get("user")));
    const currUser = c.user;
    const question = c.game_session.questions.filter(
      el => amIAnswerer ? ((el.answerer === c.user.username) && (!el.isAnswered)) :
                          ((el.answerer !== c.user.username) && (el.isAnswered)))[0];
    try {
      question.question.questionText = question.question.questionText.replace('{USER}',
        amIAnswerer ? this.buddyName : currUser.username);
    } catch (e) {}
    return question;
  }

  onNext() {
    if (this.currScreenType === this.QUESTION_SCREEN_TYPE) {
      this.onQuestionAnswered();
      return;
    }
    this.onAnswerViewed();
  }

  onQuestionAnswered() {
    const s = this.gsService.postMyAnswer(this.currOptionSelected)
      .subscribe(resp => {
        s.unsubscribe();
        this.loadingSpinnerService.show("in-game-spinner", {
          type: 'ball-grid-pulse'
        });
        this.pollForBuddyAnswer();
      });
  }

  getGsIdFromCookie() {
    const c = JSON.parse(atob(this.cookieService.get("user")));
    return c.game_session._id;
  }

  onAnswerReceived(resp) {
    this.isShowingAnswers = true;
    const ques: any = this.getQuestionFromCookie(false);
    const gsId = this.getGsIdFromCookie();
    const qId = ques._id;
    const s = this.gsService.setAnswerSeen(gsId, qId).pipe(
      take(1)
    ).subscribe(resp => {
      s.unsubscribe();
      this.typeString = this.buddyName + " says:"
      this.setAnswerAs(ques.answer);
      this.currQuestion = ques;
      this.currScreenType = this.ANSWER_SCREEN_TYPE;
    });
  }

  onAnswerViewed() {
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
      this.loadingSpinnerService.hide("in-game-spinner");
      this.onAnswerReceived(resp);
    });
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
