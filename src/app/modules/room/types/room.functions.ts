import { Room } from "./room.interface";

export function createRoom(): Room {
  return {
    urlId: "",
    users: []
  };
}

export function populateRoom(room: Room, urlId: string, users: string[]): Room {
  room.urlId = urlId ? urlId : room.urlId;
  room.users = users ? users : room.users;
  return room;
}
