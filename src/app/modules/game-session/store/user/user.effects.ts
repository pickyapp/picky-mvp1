import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { UserActionTypes, SetUsername } from "./user.actions";
import { switchMap } from "rxjs/operators";


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect({ dispatch: false })
  setUsername$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.SET_USERNAME),
    tap((action: SetUsername) => {
      this.userService.setUsername(action.username, action.gameSessionName)
        .subscribe((resp) => resp);
    })
  );
}
