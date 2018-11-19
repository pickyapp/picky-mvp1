import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { GameSessionActionTypes, GetGameSession } from "./game-session.actions";
import { GameSessionService } from "../../game-session.service";


@Injectable()
export class GameSessionEffects {
  constructor(
    private actions$: Actions,
    private gameSessionService: GameSessionService) {}

  @Effect({ dispatch: false })
  getGameSession$: Observable<Action> = this.actions$.pipe(
    ofType(GameSessionActionTypes.GET_GAME_SESSION),
    map(action => new GetGameSession("asdf"))
  );
}


