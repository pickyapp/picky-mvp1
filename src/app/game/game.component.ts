import { Component, OnInit } from '@angular/core';
import { UqService } from '../uq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private friends: String[];
  private playerName: String;
  private questionList;
  private qIndex: number;

  constructor(
    private uqService: UqService, private router: Router
  ) { }

  ngOnInit() {
    this.qIndex = 0;
    this.friends = this.uqService.getFriends();
    this.playerName = this.uqService.getPlayerName();
    this.questionList = this.uqService.getQuestions();
    this.questionList = this.questionList.map((val, i, arr) => {
      if (i !== 3 && i !== 7) {
        return {
          question: val.question.replace("USER", this.friends[i % 3]),
          ...val
        }
      } else {
        return {
          question: val.question.replace("USER", this.playerName),
          ...val
        }
      }
  });
    this.questionList[3].answerer = this.friends[0];
    this.questionList[7].answerer = this.friends[2];
  }

  // questionNameMapper(val, i, arr) => {
  //     if (i !== 3 && i !== 7) {
  //       return {
  //         question: val.question.replace("USER", this.friends[i % 3]),
  //         ...val
  //       }
  //     } else {
  //       return {
  //         question: val.question.replace("USER", this.playerName),
  //         ...val
  //       }
  //     }
  // }

  incIndex() {
    this.qIndex++;
  }  

}
