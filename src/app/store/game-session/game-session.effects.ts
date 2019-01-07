import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { GameSessionActionTypes, GetServerGameSession, SetGameSession, SetGameSessionName } from "./game-session.actions";
import { GameSessionService } from "../../services/game-session.service";
import { GameSession } from "../../types/game-session/game-session.interface";


@Injectable()
export class GameSessionEffects {
  constructor(
    private actions$: Actions,
    private gameSessionService: GameSessionService
    ) {}

  @Effect()
  getGameSession$: Observable<Action> = this.actions$.pipe(
    ofType(GameSessionActionTypes.GET_SERVER_GAME_SESSION),
    switchMap((action: GetServerGameSession) => {
      return this.gameSessionService.getSessionAt(action.gameSessionName).pipe(
        map((resp: GameSession) => {
          return new SetGameSession(resp);
        })
      );
    }
    ));
}


