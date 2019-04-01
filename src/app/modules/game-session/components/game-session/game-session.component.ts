import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, interval } from "rxjs";
import { shareReplay, switchMap, tap } from 'rxjs/operators';
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
  private sCurrUser;
  private sAllUsers: string[];
  private sCurrGameSession;

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
        if (!this.sCurrGameSession.isGameSessionFree) {
          this.router.navigate(['in-progress'], { relativeTo: this.route });
        }
        // if (this.sCurrUser) this.isAddUserDisabled = true; FIXME uncomment

      });
      // TODO: need to only make session once, subscription might be 
      // invoked multiple times

    });
  }

  startPoller1() {
    var a = interval(2000).pipe(
      switchMap(() => this.gsService.getSessionAt(this.gameSessionName)),
      tap((resp) => {
        console.log(resp);
        this.updateFromCookieSession();
        return resp;
      }),
      shareReplay());
      a.subscribe(e => console.log("Subs: ", e));
  }

  updateFromCookieSession() {
    var this_user = JSON.parse(atob(this.cookieService.get("user")));
    this.sCurrUser = this_user["user"] ? this_user["user"] : undefined;
    this.sCurrGameSession = this_user["game_session"];
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

