import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: [ 'quiz.component.scss' ]
})

export class QuizComponent {
  
  constructor(
    private router: Router
  ) {

  }

  goToCreateQuizTemplate() {
    this.router.navigate(['/quiz/template']);
  }
}
