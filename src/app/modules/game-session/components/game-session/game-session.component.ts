import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";

import { GameSession } from "src/app/types/game-session/game-session.interface";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent {
  private gameSessionName: string;
  
  
  private isAddUserButtonDisabled: boolean = false;
  private addButtonText: string = "Add me to the game";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    // TODO: initiate game session
  }

  setUsername(val: string) {
    this.isAddUserButtonDisabled = false; // !this.isAddUserButtonDisabled;
    this.addButtonText = "Added!"
    console.log("Adding: ", val, this.gameSessionName);
  }


  /**
   * @TEMPORARY
   */
  showAllCookies() {
    var this_user = JSON.parse(atob(this.cookieService.get("user")));
    console.log(this_user);
  }


  
}

