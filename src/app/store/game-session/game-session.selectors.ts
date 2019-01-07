import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/types/app-state/app-state.interface";


export const getGameSessionIsFree = createSelector(
  (state: AppState) => state.gameSession.isGameSessionFree
);
