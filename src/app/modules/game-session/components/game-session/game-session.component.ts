import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { SetUsername } from "../../store/user/user.actions";
import { MakeGameSession, InitiateGameSession } from "../../../../store/game-session/game-session.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";

import * as gameSessionDataSelectors from "../../store/game-session-data/game-session-data.selectors";
import * as gameSessionSelectors from "../../../../store/game-session/game-session.selectors";
import { GameSession } from "src/app/types/game-session/game-session.interface";

@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy {
  private gameSessionName: string;
  private currentUserUsername$: Observable<string>;
  private gameSession$: Observable<GameSession>;
  private gameSessionSubscription: Subscription;
  
  
  private isAddUserButtonDisabled: boolean = false;
  private addButtonText: string = "Add me to the game";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.dispatch(new InitiateGameSession(this.route.snapshot.params['gameSessionName']));
    this.currentUserUsername$ = this.store.pipe(select(gameSessionDataSelectors.getUserUsername));
    this.gameSession$ = this.store.pipe(select(gameSessionSelectors.getGameSession));
    this.gameSessionSubscription = this.gameSession$.subscribe((g: GameSession) => {
      if (!g.isGameSessionFree) {
        this.router.navigate([this.router.url + '/in-progress'])
        return;
      }
    });
  }

  setUsername(val: string) {
    this.isAddUserButtonDisabled = !this.isAddUserButtonDisabled;
    this.addButtonText = "Added!"
    this.store.dispatch(new SetUsername(val, this.gameSessionName));
  }

  ngOnDestroy() {
    this.gameSessionSubscription.unsubscribe();
  }


  
}

