import { Component, ViewChild } from "@angular/core";
import { QuizCreateService } from '../../services/quiz-create.service';
import { switchMap, tap, map } from "rxjs/operators";
import confetti from 'canvas-confetti';
import { interval } from "rxjs";
  
  @Component({
    selector: 'quiz-create',
    templateUrl: 'quiz-create.component.html',
    styleUrls: [ 'quiz-create.component.scss' ]
  })

  export class QuizCreateComponent {

    readonly ENTER_NAME_VIEW: string = "enter_name_view";
    readonly ANSWER_QUIZ_VIEW: string = "answer_quiz_view";
    readonly SELECT_QUIZ_VIEW: string = "select_quiz_view";
    readonly QUIZ_CREATED_VIEW: string = "quiz_created_view";
    viewType: string;

    userFirstName: string;

    quizLinkCopyButtonText: string;
    isQuizLinkCopyButtonDisabled: boolean;
    quizCreatedConfettiPopDone: boolean;

    readonly shareableMedia: string[] = [
      "Link it in Instagram bio",
      "Story it on Snapchat",
      "Post as a Facebook status",
      "Send it on Messenger",
      "Story it on WhatsApp"
    ];
    shareableMediaIndex: number;
    isShareableMediaShowing: boolean;

    constructor(
      public qcService: QuizCreateService
    ) {}

    ngOnInit() {
      this.shareableMediaIndex = 0;
      this.userFirstName = "";
      this.quizLinkCopyButtonText = "Copy Link";
      this.isQuizLinkCopyButtonDisabled = false;
      this.quizCreatedConfettiPopDone = false;
      this.isShareableMediaShowing = false;
      this.viewType = this.SELECT_QUIZ_VIEW;
      let subs = this.qcService.getQuizTemplates().subscribe(resp => {
        this.qcService.setTemplateList(resp.templates);
      });
    }

    selectOption(optionIndex: number) {
      this.qcService.updateAnswerMatrix(optionIndex);
      if (this.qcService.isFinishedAnswering) {
        this.qcService.postAnswerMatrix().subscribe(body => {
          this.viewType = this.QUIZ_CREATED_VIEW;
        });
        return;
      }
    }

    selectTemplateAt(i: number) {
      this.qcService.selectQuizTemplate(i);
      this.viewType = this.ENTER_NAME_VIEW;
    }

    createQuiz() {
      if (this.userFirstName === "") return;
      this.qcService.setUserName(this.userFirstName);
      const subs = this.qcService.createQuiz({
        user: this.userFirstName,
        quizTemplateId: this.qcService.chosenTemplate.quizTemplateId
      }).pipe(
        tap(resp => {
          this.qcService.setQuiz(resp);
        }),
        switchMap(resp => this.qcService.getQuestions())
      ).subscribe(body => {
        this.qcService.setQuestions(body.questions);
        this.viewType = this.ANSWER_QUIZ_VIEW;
        subs.unsubscribe();
      });
    }

    copyQuizLink() {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.qcService.quizLink;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.quizLinkCopyButtonText = "Copied!";
      this.isQuizLinkCopyButtonDisabled = true;
    }

    quizCreatedConfettiPop() {
      if (this.quizCreatedConfettiPopDone) return;
      this.quizCreatedConfettiPopDone = true;
      confetti({
        particleCount: 300,
        spread: 80,
        origin: {
            y: 0.7
        }
      });
    }
    
    shareableMediaShuffle() {
      if (this.isShareableMediaShowing) return;
      this.isShareableMediaShowing = true;
      const shareableMediaTextElement = document.getElementById('shareableMediaTextP');
      shareableMediaTextElement.style.opacity = "1.0";
      interval(100).subscribe(num => {
        num = num % 30;
        if (num > 19 && num < 24) {
          shareableMediaTextElement.style.opacity = ((24 - num)/5).toFixed(1)+"";
        } else if (num === 24) {
          shareableMediaTextElement.style.opacity = "0.0";
          this.shareableMediaIndex = (this.shareableMediaIndex + 1) % this.shareableMedia.length;
        } else if (num > 24) {
          shareableMediaTextElement.style.opacity = ((num - 24)/5).toFixed(1)+"";
        }
      });
    }
  }
  
