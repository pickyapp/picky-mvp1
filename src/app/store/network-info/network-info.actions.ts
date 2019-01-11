import { Action } from "@ngrx/store";



export enum NetworkInfoActionTypes {
  SUCCESS = '[NetworkActionTypes] SUCCESS',
  SERVER_ERROR = '[NetworkActionTypes] SERVER ERROR',
  FAILURE = '[NetworkActionTypes] FAILURE',
};

export class Success implements Action {
  readonly type = NetworkInfoActionTypes.SUCCESS;
  constructor(public message: string, public isSuccess: boolean) {};
};

export class ServerError implements Action {
  readonly type = NetworkInfoActionTypes.SERVER_ERROR;
  constructor(public message: string) {};
};

export class Failure implements Action {
  readonly type = NetworkInfoActionTypes.FAILURE;
  constructor(public message: string) {};
};


export type NetworkInfoActionsUnion = Success
  | ServerError
  | Failure;
