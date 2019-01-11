import { Action } from "@ngrx/store";
import { GameSession } from "../../types/game-session/game-session.interface";

export enum GameSessionActionTypes {
  INITIATE_GAME_SESSION = '[GameSession] INITIATE GAME SESSION',
  SET_GAME_SESSION = '[GameSession] SET GAME SESSION',
  CHECK_GAME_SESSION = '[GameSession] CHECK GAME SESSION',
  SET_GAME_SESSION_NAME =  '[GameSession] SET GAME SESSION NAME',
  MAKE_GAME_SESSION = '[GameSession] MAKE GAME SESSION'
};

export class InitiateGameSession implements Action {
  readonly type = GameSessionActionTypes.INITIATE_GAME_SESSION;

  constructor(public gameSessionName: string) {}
}

export class SetGameSession implements Action {
  readonly type = GameSessionActionTypes.SET_GAME_SESSION;
  constructor(public gameSession: GameSession) {}
}

export class SetGameSessionName implements Action {
  readonly type = GameSessionActionTypes.SET_GAME_SESSION_NAME;
  constructor(public name: string) {}
}

export class MakeGameSession implements Action {
  readonly type = GameSessionActionTypes.MAKE_GAME_SESSION;
  constructor(public gameSessionName: string) {}
}

export type GameSessionActionsUnion = InitiateGameSession
  | SetGameSession
  | SetGameSessionName
  | MakeGameSession;
