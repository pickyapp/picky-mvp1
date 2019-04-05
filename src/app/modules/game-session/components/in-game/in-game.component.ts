import { Component } from "@angular/core";
import { GameSessionService } from "src/app/services/game-session.service";
import { switchMap, take, tap, filter } from "rxjs/operators";
import { timer, interval } from "rxjs";




@Component({
  selector: "in-game",
  templateUrl: "in-game.component.html",
  styleUrls: ["in-game.component.scss"]
})

export class InGameComponent {

  private round: number;

  private questionTimeLeft: number;

  constructor(
    private gsService: GameSessionService
  ) {
    this.round = 0;
    this.questionTimeLeft = 0.0;
    // TODO: start cycle
    this.startRound();
  }

  startRound() {
    this.gsService.getQuestion()
      .subscribe(resp => {
        this.round++;
        this.onQuestionRecieved(resp);
        // TODO: reset timer
      });
  }

  onQuestionRecieved(resp: object) {
    // TODO: set question on UI
    const waitTime = 5000;
    var s = interval(100).subscribe(
      e => {
        this.questionTimeLeft = (waitTime/1000) - (e/10);
    });
    var timerSubs = timer(waitTime)
    .pipe(
      take(1),
      switchMap((e) => {
        this.pollForBuddyAnswer();
        return this.gsService.postMyAnswer("some answer");
      })
    )
    .subscribe(
      resp => {
        s.unsubscribe();
        timerSubs.unsubscribe();
        this.questionTimeLeft = 0;
        console.log("Time up! Sending answer...");
    });
  }

  onAnswerReceived(resp: object) {
    console.log("Your friend answered SO and SO");
    // TODO: start timer, show curr answer, redo the whole cycle
  }

  pollForBuddyAnswer() {
    // TODO: maybe we can start a UI loading circle here or something?
    const my_s = interval(2000)
      .pipe(
        switchMap(e => {
          return this.gsService.getBuddyAnswer();
        }),
        filter((resp) => resp.message === "success"), // note: here we check if buddy has answered
        take(1)                                       //       to stop polling upon their answer
      )
      .subscribe(resp => {
        this.onAnswerReceived(resp);
      });
  }

  ngOnInit() {}

}
