import { GameSessionActionsUnion, GameSessionActionTypes } from "./game-session.actions";
import { GameSession } from "../../types/game-session/game-session.interface";
import { createGameSession } from "../../types/game-session/game-session.functions";

export function gameSessionReducer(state: GameSession = createGameSession(), action: GameSessionActionsUnion): GameSession {
  switch(action.type) {
    case GameSessionActionTypes.INITIATE_GAME_SESSION:
      return state;
    case GameSessionActionTypes.SET_GAME_SESSION:
      return { ...action.gameSession };
    case GameSessionActionTypes.SET_GAME_SESSION_NAME:
      return {
        ...state,
        name: action.name
      }
    default:
      return state;
  }
}
