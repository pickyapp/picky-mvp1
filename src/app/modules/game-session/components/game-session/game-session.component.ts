import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscriber, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { SetUsername } from "../../store/user/user.actions";
import { SetGameSessionName, GetServerGameSession } from "../../../../store/game-session/game-session.actions";
import { GameSession } from "../../../../types/game-session/game-session.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../types/app-state/app-state.interface";



@Component({
  selector: "game-session",
  templateUrl: "game-session.component.html",
  styleUrls: [ "game-session.component.scss" ]
})

export class GameSessionComponent implements OnDestroy {
  private gameSession$: Observable<GameSession>;
  private gameSessionSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.dispatch(new GetServerGameSession(this.route.snapshot.params['gameSessionName']));
    this.gameSession$ = this.store.select('gameSession');
    this.gameSessionSubscription = this.gameSession$
      .subscribe(gS => {
        if (!gS.isGameSessionFree) {
          this.router.navigate([this.router.url + '/in-progress'])
        }
      });
  }

  setUsername(val: string) {
    this.store.dispatch(new SetUsername(val));
  }

  ngOnDestroy() {
    this.gameSessionSubscription.unsubscribe();
  }


  
}

