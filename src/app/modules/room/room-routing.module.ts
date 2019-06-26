import { Routes, RouterModule } from "@angular/router";
import { RoomCreateComponent } from "./components/room-create/room-create.component";
import { RoomComponent } from "./components/room/room.component";
import { RoomPlayComponent } from "./components/room-play/room-play.component";




const routes: Routes = [
  { path: 'create', component: RoomCreateComponent },
  { path: ':urlId', component: RoomComponent },
  { path: ':urlId/play', component: RoomPlayComponent },
];

export const RoomRouting = RouterModule.forChild(routes);
