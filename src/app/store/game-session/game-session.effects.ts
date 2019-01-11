import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap, map, mapTo, catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { GameSessionActionTypes, SetGameSession, SetGameSessionName, MakeGameSession, InitiateGameSession } from "./game-session.actions";
import { GameSessionService } from "../../services/game-session.service";
import { GameSession } from "../../types/game-session/game-session.interface";


@Injectable()
export class GameSessionEffects {
  constructor(
    private actions$: Actions,
    private gameSessionService: GameSessionService
    ) {}

  @Effect()
  initiateGameSession$: Observable<Action> = this.actions$.pipe(
    ofType(GameSessionActionTypes.INITIATE_GAME_SESSION),
    switchMap((action: InitiateGameSession) => {
      return this.gameSessionService.getSessionAt(action.gameSessionName).pipe(
        map(resp => resp.payload)
      )
    }),
    switchMap(gameSession => {
      console.log("Adasdsad");
      return [new MakeGameSession(gameSession.name),
      new SetGameSession({
        name: gameSession.name,
        isGameSessionFree: gameSession.isGameSessionFree
      })]
    }
    )
  );

  @Effect({ dispatch: false })
  makeGameSession$: Observable<Action> = this.actions$.pipe(
    ofType(GameSessionActionTypes.MAKE_GAME_SESSION),
    tap((action: MakeGameSession) => {
      this.gameSessionService.makeSession(action.gameSessionName).subscribe();
    }
      ))
}

