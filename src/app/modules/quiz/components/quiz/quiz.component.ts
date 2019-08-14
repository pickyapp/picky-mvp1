import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: [ 'quiz.component.scss' ]
})

export class QuizComponent {

  listOfResults: string[];
  instructions: string[];

  isQuizResultsListCardVisible: boolean;
  

  ngOnInit() {
    this.listOfResults = [
      "Quiz attempts",
      "Messages from answerers",
      "People's score",
      "And much more!"
    ];
    this.instructions = [
      "Create a Quiz",
      "Share link with friends",
      "View Results!"
    ];
    this.isQuizResultsListCardVisible = false;
  }

  constructor(
    private router: Router
  ) {}

  toggleQuizResultsListCard() {
    this.isQuizResultsListCardVisible = !this.isQuizResultsListCardVisible;
  }

  goToCreateQuiz() {
    this.router.navigate(['/quiz/create']);
  }
}
