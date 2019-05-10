import { Component, Input, Output, EventEmitter } from "@angular/core";
import { interval, Observable, timer } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";





@Component({
  selector: "timer",
  templateUrl: "./timer.component.html"
  // TODO: add styles
})


export class TimerComponent {

  @Input("time") private timeLeft: number;
  @Output() onTimerFinished = new EventEmitter<string>();

  private timerType: string;

  private timeOnScreen: string;
  private totalWaitTime: number;

  setTime(time: number) {
    this.timeLeft = time;
    this.totalWaitTime = time;
    this.timeOnScreen = (this.timeLeft / 1000).toFixed(1);
  }
  
  setTimerType(type: string) {
    this.timerType = type;
  }

  startTimer() {
    const timer = this.getTimer(this.timeLeft);
    const iSub = timer.myInterval.subscribe(currTimeLeft => {
      const progBar = document.getElementById("timerProgress");
      progBar.style.width = ((100 * currTimeLeft) / (this.totalWaitTime/1000)) + '%';
      this.timeOnScreen = currTimeLeft.toFixed(1);
    });
    const tSub = timer.myTimer.subscribe(e => {
      this.timeOnScreen = "0.0";
      this.timeLeft = 0;
      iSub.unsubscribe();
      tSub.unsubscribe();
      this.onTimerFinished.emit(this.timerType); // Timer done!
    })
  }

  getTimer(waitTime: number) {
    this.totalWaitTime = waitTime;
    return { myInterval: interval(100).pipe(
      map((e) => (waitTime/1000) - (e/10)) // Changes value to tenth's of a second (i.e. 3.2, 2.1, 0.1 etc)
    ),
    myTimer: timer(waitTime).pipe(
      take(1)
    )};
  }




}
