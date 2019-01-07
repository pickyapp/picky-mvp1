import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { SetUsername } from "../../store/user/user.actions";
import { GetServerGameSession } from "../../../../store/game-session/game-session.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";

import * as gameSessionDataSelectors from "../../store/game-session-data/game-session-data.selectors";
import * as gameSessionSelectors from "../../../../store/game-session/game-session.selectors";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy {
  private gameSessionName: string;
  private gameSessionIsFreeSubscription: Subscription;
  private currentUserUsername$: Observable<string>;
  private gameSessionIsFree$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.dispatch(new GetServerGameSession(this.route.snapshot.params['gameSessionName']));
    this.currentUserUsername$ = this.store.pipe(select(gameSessionDataSelectors.getUserUsername));
    this.gameSessionIsFree$ = this.store.pipe(select(gameSessionSelectors.getGameSessionIsFree));
    this.gameSessionIsFreeSubscription = this.gameSessionIsFree$
      .subscribe(isFree => {
        if (!isFree) this.router.navigate([this.router.url + '/in-progress'])
      });
  }

  setUsername(val: string) {
    this.store.dispatch(new SetUsername(val, this.gameSessionName));
  }

  ngOnDestroy() {
    this.gameSessionIsFreeSubscription.unsubscribe();
  }


  
}

