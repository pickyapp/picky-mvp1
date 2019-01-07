import { GameSession } from "../game-session/game-session.interface";
import { GameSessionData } from "../../modules/game-session/types/game-session-data/game-session-data.interface";





export interface AppState {
  gameSession: GameSession,
  gameSessionData: GameSessionData
}
