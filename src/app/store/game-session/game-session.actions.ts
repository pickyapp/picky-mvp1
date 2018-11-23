import { Action } from "@ngrx/store";
import { GameSession } from "../../types/game-session/game-session.interface";

export enum GameSessionActionTypes {
  GET_SERVER_GAME_SESSION = '[GameSession] GET SERVER GAME SESSION',
  SET_GAME_SESSION = '[GameSession] SET GAME SESSION',
  SET_GAME_SESSION_NAME =  '[GameSession] SET GAME SESSION NAME'
}

export class GetServerGameSession implements Action {
  readonly type = GameSessionActionTypes.GET_SERVER_GAME_SESSION;

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

export type GameSessionActionsUnion = GetServerGameSession | SetGameSession | SetGameSessionName;
