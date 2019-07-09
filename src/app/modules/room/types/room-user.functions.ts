import { RoomUser } from "./room-user.interface";



export function createRoomUser(): RoomUser {
  return {
    username: "",
    unseenCount: 0
  };
}
