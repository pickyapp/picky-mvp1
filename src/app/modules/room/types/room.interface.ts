import { RoomUser } from "./room-user.interface";

export interface Room {
  urlId: string,
  users: RoomUser[]
};
