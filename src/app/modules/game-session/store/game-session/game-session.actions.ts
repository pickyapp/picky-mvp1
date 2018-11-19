import { Action } from "@ngrx/store";



export enum GameSessionActionTypes {
  GET_GAME_SESSION = '[GameSession] GET GAME SESSION'
}

export class GetGameSession implements Action {
  readonly type = GameSessionActionTypes.GET_GAME_SESSION;

  constructor(public gameSessionName: string) {}
}

export type GameSessionActionsUnion = GetGameSession;
