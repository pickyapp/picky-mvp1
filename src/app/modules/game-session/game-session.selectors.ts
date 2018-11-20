import { createFeatureSelector } from "@ngrx/store";
import { User } from "./types/user/user.interface";

export const getUserState = createFeatureSelector<User>('gameSessionData');