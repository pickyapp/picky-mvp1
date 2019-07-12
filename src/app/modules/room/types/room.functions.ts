import { Room } from "./room.interface";
import { RoomUser } from "./room-user.interface";

export function createRoom(): Room {
  return {
    urlId: "",
    users: []
  };
}

export function populateRoom(room: Room, urlId: string, users: RoomUser[]): Room {
  room.urlId = urlId ? urlId : room.urlId;
  room.users = users ? users : room.users;
  return room;
}
