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
  private totalWaitTime: number;

  private iSub;
  private tSub;

  progressLeftTime: number;
  progressTotalTime: number; 

  constructor() {}

  ngOnInit() {
    this.progressLeftTime = 1000;
    this.progressTotalTime = 1000;
  }

  setTime(time: number) {
    this.totalWaitTime = time;
    this.progressLeftTime = time;
    this.progressTotalTime = time;
  }
  
  setTimerType(type: string) {
    this.timerType = type;
  }

  stopTimer() {
    this.isTimerStopped = true;
    this.progressLeftTime = 0;
    this.iSub.unsubscribe();
    this.tSub.unsubscribe();
  }

  startTimer() {
    this.isTimerStopped = false;
    const timer = this.getTimer(this.totalWaitTime);
    this.iSub = timer.myInterval.subscribe(currTimeLeft => {
      this.progressLeftTime = currTimeLeft;
    });
    this.tSub = timer.myTimer.subscribe(e => {
      this.iSub.unsubscribe();
      this.tSub.unsubscribe();
      if (!this.isTimerStopped) {
        this.stopTimer();
        this.onTimerFinished.emit(this.timerType); // Timer done!
      }
    })
  }

  getTimer(waitTime: number) {
    this.totalWaitTime = waitTime;
    return { myInterval: interval(10).pipe(
      map((e) => (waitTime - (e*10)))
    ),
    myTimer: timer(waitTime).pipe(
      take(1)
    )};
  }




}
