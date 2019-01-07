import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { Store, createSelector, select } from "@ngrx/store";
import { SetUsername } from "../../store/user/user.actions";
import { SetGameSessionName, GetServerGameSession } from "../../../../store/game-session/game-session.actions";
import { GameSession } from "../../../../types/game-session/game-session.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";
import { tap } from "rxjs/operators";

import * as gameSessionDataSelectors from "../../store/game-session-data/game-session-data.selectors";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy {

  private usernameStr: string;

  private gameSession$: Observable<GameSession>;
  private gameSessionName: string;
  private gameSessionSubscription: Subscription;
  private currentUserUsername$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.pipe(
      select(createSelector((state: AppState) => state)),
      tap(a => a)
    ).subscribe(a => console.log(a));

    this.store.dispatch(new GetServerGameSession(this.route.snapshot.params['gameSessionName']));
    this.gameSession$ = this.store.select('gameSession');
    this.currentUserUsername$ = this.store.pipe(select(gameSessionDataSelectors.getUserUsername));
    this.gameSessionSubscription = this.gameSession$
      .subscribe(gS => {
        if (!gS.isGameSessionFree) {
          this.router.navigate([this.router.url + '/in-progress'])
          return;
        }
        this.gameSessionName = gS.name;
      });
  }

  setUsername(val: string) {
    this.store.dispatch(new SetUsername(val, this.gameSessionName));
  }

  ngOnDestroy() {
    this.gameSessionSubscription.unsubscribe();
  }


  
}

