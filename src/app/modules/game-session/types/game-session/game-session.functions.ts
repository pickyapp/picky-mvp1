import { GameSession } from "./game-session.interface";




export function createGameSession(): GameSession {
  return {
    name: '',
    isGameSessionFree: true
  };
}