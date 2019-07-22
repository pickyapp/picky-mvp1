import { Component, OnInit } from "@angular/core";
import { RoomService } from "../../services/room.service";
import { NetworkRoomService } from "../../services/network-room.service";
import { take, switchMap, tap } from "rxjs/operators";
import { timer } from "rxjs";
import { environment } from 'src/environments/environment';
import confetti from "canvas-confetti";



@Component({
  selector: "room-play",
  templateUrl: "room-play.component.html",
  styleUrls: ["room-play.component.scss"]
})

export class RoomPlayComponent implements OnInit {

  readonly ANSWER_VIEW: string = "answer_view";
  readonly QUESTION_VIEW: string = "question_view";
  readonly ROUND_DONE_VIEW: string = "round_done_view";

  showAnswerTip: boolean;
  showQuestionTip: boolean;
  copyUrlBtnText: string;
  copyUrlBtnIsDisabled: boolean;
  confettiPopDone: boolean;

  currUsername: string;

  currQuestion;
  buddyName: string;
  questionLimit: number;
  questionsLeftToAnswer: number;

  canClickAnswers: boolean;

  viewType: string;

  constructor(
    private roomService: RoomService,
    private nRoomService: NetworkRoomService
  ) {
    this.currUsername = this.roomService.getCurrUserUsername();
    this.buddyName = this.roomService.getBuddyName();
    this.questionLimit = 1; // this.roomService.getQuestionLimit();
    this.questionsLeftToAnswer = this.questionLimit;
  }

  ngOnInit() {
    this.showAnswerTip = !this.roomService.getTipIsSeen(2);
    this.showQuestionTip = !this.roomService.getTipIsSeen(1);
    this.viewType = this.ANSWER_VIEW;
    this.canClickAnswers = true;
    this.currQuestion = {
      questionText: "",
      options: []
    };
    this.copyUrlBtnText = "Click to copy URL";
    this.copyUrlBtnIsDisabled = false;
    this.confettiPopDone = false;
    this.roomService.setShareUrl(environment.domain + '/room/' + this.roomService.getUrlId());
    if (!this.roomService.getTipIsSeen(0)) this.setTipSeen(0)
    let s2 = this.nRoomService.networkPipe(this.nRoomService.getUnseenCount(this.roomService.getCurrUserUsername()))
      .pipe(tap(b => {
        this.roomService.setUnseenCount(this.roomService.getCurrUserUsername(), b.unseenCount);
        this.updateView();
        if (b.unseenCount > 0) {
          this.showAnswer();
        } else {
          this.getQuestion();
        }
      }),
      switchMap(b => {
        return this.nRoomService.networkPipe(this.nRoomService.getUnansweredQuestionAmount());
      }))
      .subscribe(b => {
        s2.unsubscribe();
        this.roomService.setUnansweredQuestionAmount(this.roomService.getCurrUserUsername(), b.unansweredQuestionAmount);
        this.updateView();
        this.questionLimit = this.roomService.getUnansweredQuestionAmount(this.roomService.getCurrUserUsername()); // b.unseenCount < 5 ? b.unseenCount : this.roomService.getQuestionLimit();
        this.questionsLeftToAnswer = this.questionLimit;
      });
  }

  updateView() {
    const unseenAnswersCount = this.roomService.getUnseenCount(this.roomService.getCurrUserUsername());
    const unansweredQuestionAmount = this.roomService.getUnansweredQuestionAmount(this.roomService.getCurrUserUsername());
    if (unseenAnswersCount) {
      this.viewType = this.ANSWER_VIEW;
      return;
    } else if (unansweredQuestionAmount) {
      this.viewType = this.QUESTION_VIEW;
      return;
    } else if (!unansweredQuestionAmount && !unseenAnswersCount) {
      this.viewType = this.ROUND_DONE_VIEW;
      return;
    }
    this.viewType = this.QUESTION_VIEW;
  }

  getQuestion() {
    if (this.questionsLeftToAnswer <= 0) {
      // TODO: show done screen
      this.updateView();
      return;
    }
    let s = this.nRoomService.networkPipe(this.nRoomService.getQuestion())
      .subscribe(body => {
        s.unsubscribe();
        if (this.showQuestionTip) this.setTipSeen(1);
        if (body.message !== "success") return;
        this.roomService.setCurrQuesRoom(body);
        this.currQuestion = this.roomService.getCurrQuesRoom().questionRef;
    });
  }

  // When the current user answers a question
  onAnswer(i) {
    this.canClickAnswers = false;
    const s = this.nRoomService.networkPipe(this.nRoomService.postAnswer(i))
      .subscribe(body => {
        this.questionsLeftToAnswer--;
        this.roomService.decrementUnansweredQuestionAmount(this.roomService.getCurrUserUsername());
        this.getQuestion();
        this.canClickAnswers = true;
        s.unsubscribe();
    });
  }

  onAnswerNext() {
    this.roomService.decrementUnseenCount();
    this.showAnswer();
  }

  showAnswer() {
    if (this.roomService.getUnseenCount(this.roomService.getCurrUserUsername()) <= 0) {
      this.updateView();
      this.getQuestion();
      return ;
    }
    const s = this.nRoomService.networkPipe(this.nRoomService.getAnswer())
      .subscribe(body => {
        if (this.showAnswerTip) this.setTipSeen(2);
        this.roomService.setCurrQuesRoom(body);
        this.currQuestion = this.roomService.getCurrQuesRoom().questionRef;
        this.currQuestion.answerIndex = this.roomService.getBuddyAnswerIndex();
        s.unsubscribe();
      })
  }

  closeTip(type: number) {
    let s = timer(500).pipe(take(1)).subscribe(e => {
      s.unsubscribe();
      if (!type) {
        this.showAnswerTip = false;
        return;
      }
      this.showQuestionTip = false;
    });
  }

  setTipSeen(tipIndex) {
    let s1 = this.nRoomService.networkPipe(this.nRoomService.postTipSeen(tipIndex))
      .subscribe(b => {
        this.roomService.setTipIsSeen(tipIndex);
        s1.unsubscribe();
    });
  }

  copyUrl() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.roomService.getShareUrl();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyUrlBtnText = "Copied!";
    this.copyUrlBtnIsDisabled = true;
  }

  confettiPop() {
    if (this.confettiPopDone) return;
    this.confettiPopDone = true;
    confetti({
      particleCount: 300,
      spread: 80,
      origin: {
          y: 0.7
      }
    });
  }

}
