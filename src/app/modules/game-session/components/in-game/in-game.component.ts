import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { GameSessionService } from "src/app/services/game-session.service";
import { switchMap, take, tap, filter, map } from "rxjs/operators";
import { timer, interval, Observable, of } from "rxjs";
import { TimerComponent } from "src/app/modules/ui/timer/timer.component";
import { UtilityService } from "../../services/utility.service";




@Component({
  selector: "in-game",
  templateUrl: "in-game.component.html",
  styleUrls: ["in-game.component.scss"]
})

export class InGameComponent implements AfterViewInit {

  @ViewChild("gameTimer")
  private gameTimerComponent: TimerComponent;

  private readonly QUESTION_VIEW_TIME: number = 1000;
  private readonly QUESTION_TIMER_TYPE: string = "question_timer";
  private readonly ANSWER_VIEW_TIME: number = 2000;
  private readonly ANSWER_TIMER_TYPE: string = "answer_timer";
  private readonly TOTAL_ROUNDS: number = 5;

  private round: number;

  private timerTimeLeft: number;

  private quesAnsString: string; // FIXME: temp

  ngAfterViewInit() { this.startRound() }

  constructor(
    private gsService: GameSessionService,
    private utilityService: UtilityService
  ) {
    this.round = 0;
  }

  startRound() {
    this.gsService.getQuestion()
      .subscribe(resp => {
        this.round++;
        this.quesAnsString = resp.body.question;
        this.startTimer(this.QUESTION_VIEW_TIME, this.QUESTION_TIMER_TYPE);
        // TODO: reset timer
    });
  }

  onTimerFinished(timerType: string) {
    if (timerType === "question_timer") {
      this.onQuestionTimerFinished();
      return;
    }
    this.onAnswerTimerFinished();
  }

  onQuestionTimerFinished() {
    console.log("Question timer up!");
    this.pollForBuddyAnswer();
    this.gsService.postMyAnswer("some answer");
  }

  onAnswerReceived(resp) {
    this.quesAnsString = resp.body.buddyAnswer;
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
      2000,
      (e) => this.gsService.getBuddyAnswer(),
      (resp) => {
        return resp.body.message === "success"
      } // FIXME: check for buddy answer
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

  ngOnInit() {}

  ngOnDestroy() {
    // TODO: destroy all subscribers
  }

}
