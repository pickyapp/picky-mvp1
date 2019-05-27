import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, of, Subject, Subscription, timer } from "rxjs";
import { shareReplay, switchMap, tap, take, filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../services/user.service";
import { GameSessionService } from "src/app/services/game-session.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy, OnInit {

  private addButtonText: string = "Join";
  private copyButtonText: string = "Copy URL"
  private gameSessionName: string;
  isGameView: boolean;

  private routeSubscription: Subscription;
  private pollSubscription: Subscription;
  
  // 's' prepended vars are vars related to the current cookie session
  private sCurrUser$: Subject<object>;
  private sCurrGameSession$: Subject<object>;
  private sCurrUser;
  private sCurrGameSession;

  private countdownStarted: boolean;
  private countdownTimerTimeLeft: number;
  private showCountdown: boolean;

  private isAddUserDisabled: boolean;
  private isCopyButtonDisabled: boolean;

  ngOnInit() {
    this.isGameView = false; 
    this.countdownTimerTimeLeft = 3.0;
    this.showCountdown = true;
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
    this.isCopyButtonDisabled = false;

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
      this.showCountdown = true;
      const waitTime = (this.sCurrGameSession.startCountdownTime + 3000) - (new Date()).getTime();
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
    if (!val || val === "") return;
    this.isAddUserDisabled = true;
    this.addButtonText = "Added!"
    this.userService.setUsername(val, this.sCurrGameSession.name).subscribe(resp => {
      this.updateFromCookieSession();
    });
  }

  copyUrlToClipboard() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = environment.domain + this.router.url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyButtonText = "Copied!";
    this.isCopyButtonDisabled = true;
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

