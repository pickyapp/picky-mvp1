import { Component, OnDestroy } from "@angular/core";
import { interval, of, Subject, Subscription } from "rxjs";
import { shareReplay, switchMap, tap, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../services/user.service";
import { GameSessionService } from "src/app/services/game-session.service";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy {

  private addButtonText: string = "Add me to the game";
  private gameSessionName: string;

  private routeSubscription: Subscription;
  private pollSubscription: Subscription;
  
  // 's' prepended vars are vars related to the current cookie session
  private sCurrUser;
  private sCurrUser$: Subject<object>;
  private sAllUsers: string[];
  private sCurrGameSession;
  private sCurrGameSession$: Subject<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private gsService: GameSessionService
  ) {
    this.sCurrUser$ = new Subject<object>();
    this.sCurrGameSession$ = new Subject<object>();
    this.routeSubscription = this.route.params.pipe(
      takeWhile(val => !this.gameSessionName), // while doesn't exist
      tap((params) => {
        this.gameSessionName = params["gameSessionName"];
        return params;
      }),
      switchMap((params) => this.gsService.makeSession(this.gameSessionName)),
    ).subscribe(resp => {
      this.updateFromCookieSession();
      if (!this.sCurrGameSession.isGameSessionFree) {
        this.router.navigate(['in-progress'], { relativeTo: this.route });
      }
    });
    this.pollSubscription = interval(2000).pipe( // Polling for updates
      shareReplay(),
      switchMap(() => this.gsService.getSessionAt(this.gameSessionName))
      ).subscribe((resp) => {
        this.updateFromCookieSession();
        return resp;
    });
  }

  updateFromCookieSession() {
    var this_user = JSON.parse(atob(this.cookieService.get("user")));
    this.sCurrUser = this_user["user"];
    this.sCurrGameSession = this_user["game_session"];
    this.sAllUsers = this_user["game_session"]["all_users"];
    this.sCurrUser$.next(this.sCurrUser);
    this.sCurrGameSession$.next(this.sCurrGameSession);
  }

  setUsername(val: string) {
    // this.isAddUserDisabled = true; FIXME uncomment
    this.addButtonText = "Added!"
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

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.pollSubscription.unsubscribe();
  }
  
}

