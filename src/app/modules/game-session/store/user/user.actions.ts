import { Action } from "@ngrx/store";


export enum UserActionTypes {
  SET_USERNAME =  '[User] SET USERNAME'
}

export class SetUsername implements Action {
  readonly type = UserActionTypes.SET_USERNAME;

  constructor(public username: string, public gameSessionName: string) {}
}


export type UserActionsUnion = SetUsername;

