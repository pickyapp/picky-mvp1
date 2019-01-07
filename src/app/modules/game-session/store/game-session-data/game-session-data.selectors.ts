import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/types/app-state/app-state.interface";


export const getUserUsername = createSelector(
  (state: AppState) => state.gameSessionData.user.username
);
