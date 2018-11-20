import { GameSessionActionsUnion, GameSessionActionTypes } from "./game-session.actions";
import { GameSession } from "../../types/game-session/game-session.interface";
import { createGameSession } from "../../types/game-session/game-session.functions";

export function gameSessionReducer(state: GameSession = createGameSession(), action: GameSessionActionsUnion) {
  switch(action.type) {
    case GameSessionActionTypes.GET_SERVER_GAME_SESSION:
      return state;
    default:
      return state;
  }
}
