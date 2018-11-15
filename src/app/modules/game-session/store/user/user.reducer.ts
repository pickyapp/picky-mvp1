import { createUser } from "../../types/user/user.functions";
import { UserActionsUnion, UserActionTypes } from "./user.actions";
import { User } from "../../types/user/user.interface";

export function userReducer(state: User = createUser(), action: UserActionsUnion) {
  switch(action.type) {
    case UserActionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}
