import { Action } from "@ngrx/store";


export enum UserActionTypes {
  SET_USERNAME =  '[User] SET USERNAME'
}

export class SetUsername implements Action {
  readonly type = UserActionTypes.SET_USERNAME;

  constructor(public username: String) {}
}


export type UserActionsUnion = SetUsername;

