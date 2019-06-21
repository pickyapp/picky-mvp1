import { Component, Input, Output, EventEmitter } from "@angular/core";
import { interval, timer } from "rxjs";
import { map, take } from "rxjs/operators";





@Component({
  selector: "timer",
  templateUrl: "./timer.component.html"
  // TODO: add styles
})


export class TimerComponent {

  @Input("time") timeLeft: number;
  @Output() onTimerFinished = new EventEmitter<string>();

  private timerType: string;
  private isTimerStopped: boolean;

  private timeOnScreen: string;
  private totalWaitTime: number;

  private iSub;
  private tSub;

  setTime(time: number) {
    this.totalWaitTime = time;
    this.timeOnScreen = (this.totalWaitTime / 1000).toFixed(1);
  }
  
  setTimerType(type: string) {
    this.timerType = type;
  }

  stopTimer() {
    this.isTimerStopped = true;
    this.updateProgress(0);
    this.iSub.unsubscribe();
    this.tSub.unsubscribe();
  }

  startTimer() {
    this.isTimerStopped = false;
    const timer = this.getTimer(this.totalWaitTime);
    this.iSub = timer.myInterval.subscribe(currTimeLeft => {
      this.updateProgress(currTimeLeft);
    });
    this.tSub = timer.myTimer.subscribe(e => {
      this.timeOnScreen = "0.0";
      this.iSub.unsubscribe();
      this.tSub.unsubscribe();
      if (!this.isTimerStopped) {
        this.onTimerFinished.emit(this.timerType); // Timer done!
      }
    })
  }

  updateProgress(currTimeLeft) {
    const progBar = document.getElementById("timerProgress");
    progBar.style.width = ((100 * currTimeLeft) / (this.totalWaitTime/1000)) + '%';
    this.timeOnScreen = currTimeLeft.toFixed(1);
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
