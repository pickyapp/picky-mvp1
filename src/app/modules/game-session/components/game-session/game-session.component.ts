import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";

import { GameSession } from "src/app/types/game-session/game-session.interface";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../services/user.service";
import { GameSessionService } from "src/app/services/game-session.service";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent {
  
  private isAddUserDisabled: boolean = false;
  private addButtonText: string = "Add me to the game";
  private gameSessionName: string;
  private routeSub: Subscription;
  
  // 's' prepended vars are vars related to the current cookie session
  private sCurrUser: string;
  private sAllUsers: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private gsService: GameSessionService
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameSessionName = params["gameSessionName"];
      this.gsService.makeSession(this.gameSessionName).subscribe(r => {
        this.updateFromCookieSession();
        // if (this.sCurrUser) this.isAddUserDisabled = true; FIXME uncomment
        // TODO: redirect to in-progress if game-session busy
      });
      // TODO: need to only make session once, subscription might be 
      // invoked multiple times
    });
  }

  updateFromCookieSession() {
    var this_user = JSON.parse(atob(this.cookieService.get("user")));
    this.sCurrUser = this_user["user"] ? this_user["user"]["username"] : "";
    this.sAllUsers = this_user["all_users"];
  }

  setUsername(val: string) {
    // this.isAddUserDisabled = true; FIXME uncomment
    this.addButtonText = "Added!"
    console.log("Adding: ", val, this.gameSessionName);
    this.userService.setUsername(val, this.gameSessionName).subscribe(resp => {
      this.updateFromCookieSession();
    });
  }


  /**
   * @TEMPORARY
   */
  showCookieValue(cookieName: string) {
    var this_user = JSON.parse(atob(this.cookieService.get(cookieName)));
    console.log(this_user);
  }


  
}

