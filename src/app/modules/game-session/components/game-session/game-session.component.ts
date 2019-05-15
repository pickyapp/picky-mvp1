import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, of, Subject, Subscription, timer } from "rxjs";
import { shareReplay, switchMap, tap, take, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../services/user.service";
import { GameSessionService } from "src/app/services/game-session.service";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy, OnInit {

  private addButtonText: string = "JOIN";
  private gameSessionName: string;
  private isGameView: boolean;

  private routeSubscription: Subscription;
  private pollSubscription: Subscription;
  
  // 's' prepended vars are vars related to the current cookie session
  private sCurrUser$: Subject<object>;
  private sCurrGameSession$: Subject<object>;
  private sCurrUser;
  private sCurrGameSession;

  private countdownStarted: boolean;
  private countdownTimerTimeLeft: number;

  private isAddUserDisabled: boolean;

  ngOnInit() {
    this.isGameView = false; 
    this.countdownTimerTimeLeft = 0.0;
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private gsService: GameSessionService
  ) {
    this.sCurrUser$ = new Subject<object>();
    this.sCurrGameSession$ = new Subject<object>();
    this.countdownStarted = false;
    this.isAddUserDisabled = false;

    this.routeSubscription = this.route.params.pipe(
      take(1), // need to run only once
      switchMap((params) => this.gsService.makeSession(params["gameSessionName"])),
    ).subscribe(resp => {
      this.updateFromCookieSession();
      if (!this.sCurrGameSession.isGameSessionFree) {
        this.router.navigate(['in-progress'], { relativeTo: this.route }); // temporary
      }
    });

    this.pollSubscription = interval(1000).pipe( // Polling for updates
      shareReplay(),
      switchMap(() => this.gsService.getSessionAt(this.sCurrGameSession.name)),
      tap(resp => this.updateFromCookieSession()),
      filter(resp => this.sCurrGameSession.users.length === 2),
      take(1)
      ).subscribe((resp) => {
        this.updateFromCookieSession();
        this.checkStartCountdown();
        return resp;
    });
  }

  checkStartCountdown() {
    if (!this.sCurrGameSession.isGameSessionFree && !this.countdownStarted) { // i.e. game session just locked
      // TODO: maybe here we can stop the gs update polling?
      console.log("COUNTDOWN STARTED!");
      const waitTime = (this.sCurrGameSession.startCountdownTime + 3000) - (new Date()).getTime();
      console.log("Time to wait", waitTime+"ms");
      this.countdownStarted = true;
      var s = interval(100).subscribe(e => {
        this.countdownTimerTimeLeft = (waitTime/1000) - (e/10); // UI
      });
      var timerSubs = timer(waitTime).subscribe(
        e => {
          s.unsubscribe();
          timerSubs.unsubscribe();
          this.isGameView = true; // Starts the game
      });
    }
  }

  updateFromCookieSession() {
    var this_user = JSON.parse(atob(this.cookieService.get("user")));
    this.sCurrUser = this_user["user"];
    this.sCurrGameSession = this_user["game_session"];
    this.sCurrUser$.next(this.sCurrUser);
    this.sCurrGameSession$.next(this.sCurrGameSession);
  }

  setUsername(val: string) {
    this.isAddUserDisabled = true;
    this.addButtonText = "Added!"
    this.userService.setUsername(val, this.sCurrGameSession.name).subscribe(resp => {
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

