import { NetworkInfo } from "src/app/types/network-info/network-info.interface";
import { createNetworkInfo } from "src/app/types/network-info/network-info.functions";
import { NetworkInfoActionsUnion, NetworkInfoActionTypes } from "./network-info.actions";


export function networkInfoReducer(state: NetworkInfo = createNetworkInfo(), action: NetworkInfoActionsUnion): NetworkInfo {
  switch(action.type) {
    case NetworkInfoActionTypes.SUCCESS:
      return { success: action.isSuccess, ...state}
    default:
      return state;
  }
}
