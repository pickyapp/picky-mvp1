import { Component } from "@angular/core";
import { GameSessionService } from "src/app/services/game-session.service";
import { switchMap, take, tap, filter, map } from "rxjs/operators";
import { timer, interval, Observable, of } from "rxjs";




@Component({
  selector: "in-game",
  templateUrl: "in-game.component.html",
  styleUrls: ["in-game.component.scss"]
})

export class InGameComponent {

  private round: number;

  private timerTimeLeft: number;

  private quesAnsString: string; // FIXME: temp

  constructor(
    private gsService: GameSessionService
  ) {
    this.round = 0;
    this.timerTimeLeft = 0.0;
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
    this.quesAnsString = "QUESTION";
    const questionTimer = this.getTimer(
      5000,
      (e) => {
        this.pollForBuddyAnswer();
        return this.gsService.postMyAnswer("some answer");
    });
    const iSub = questionTimer.myInterval.subscribe(
      (e) => { this.timerTimeLeft = e; }
    );
    const tSub = questionTimer.myTimer.subscribe(
      (resp) => {
        iSub.unsubscribe();
        tSub.unsubscribe();
        this.timerTimeLeft = 0;
      }
    );
  }

  onAnswerReceived(resp: object) {
    this.quesAnsString = "ANSWER";
    const answerViewingTimer = this.getTimer(
      5000,
      (e) => (this.round === 10) ?
                of({ gameOver: true }) :
                this.gsService.getQuestion()
    );
    const iSub = answerViewingTimer.myInterval.subscribe(
      (e) => { this.timerTimeLeft = e; }
    );
    const tSub = answerViewingTimer.myTimer.subscribe(
      (resp) => {
        iSub.unsubscribe();
        tSub.unsubscribe();
        this.timerTimeLeft = 0;
        if (!resp.gameOver) this.onQuestionRecieved(resp);
        else this.quesAnsString = "DONE!";
        this.round++;
    });
  }

  pollForBuddyAnswer() {
    // TODO: maybe we can start a UI loading circle here or something?
    const my_s = this.getPoller(
      2000,
      (e) => this.gsService.getBuddyAnswer(),
      (resp) => {
        return resp.body.message === "success"
      } // FIXME: check for buddy answer
    ).subscribe(resp => {
      this.onAnswerReceived(resp);
    });
  }

  getTimer(waitTime: number, onTimerEmit: (e) => Observable<any>) {
    return { myInterval: interval(100).pipe(
      map((e) => (waitTime/1000) - (e/10)) // Changes value to tenth's of a second (i.e. 3.2, 2.1, 0.1 etc)
    ),
    myTimer: timer(waitTime).pipe(
      take(1),
      switchMap(onTimerEmit) // Only onTimerEmit only exists sometimes
    )};
  }

  getPoller(intervalTime: number,
            pollFct: (intervalEmit: number) => Observable<any>,
            pollUntil: (resp) => boolean): Observable<any> {
    return timer(0, intervalTime).pipe(
      switchMap(pollFct), // TODO switchMap might cancel requests look at others
      filter(pollUntil),
      take(1)
    )
  }



  ngOnInit() {}

  ngOnDestroy() {
    // TODO: destroy all subscribers
  }

}
