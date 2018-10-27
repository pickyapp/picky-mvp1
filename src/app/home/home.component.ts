import { Component, OnInit } from '@angular/core';
import { UqService } from '../uq.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private friends: String[];
  private playerName:  String;

  constructor(private uqService: UqService, private router: Router) { }

  ngOnInit() {
    this.friends = ["", "", "", ""]
  }

  startGame() {
    this.uqService.setFriends(this.friends);
    this.uqService.setPlayerName(this.playerName);
    this.router.navigateByUrl("/game");
  }

}
