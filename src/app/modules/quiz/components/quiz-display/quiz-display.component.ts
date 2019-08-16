import { Component } from "@angular/core";
  
  @Component({
    selector: 'quiz-display',
    templateUrl: 'quiz-display.component.html',
    styleUrls: [ 'quiz-display.component.scss' ]
  })

  export class QuizDisplayComponent {
    readonly QUIZ_TITLE_PAGE_VIEW: string = "quiz_title_page_view";
    readonly QUIZ_GAMEPLAY_VIEW: string = "quiz_gameplay_view";
    readonly QUIZ_RESULTS_VIEW: string = "quiz_results_view";
    viewType: string;


    ngOnInit() {
      this.viewType = this.QUIZ_TITLE_PAGE_VIEW;
    }
  }
  
