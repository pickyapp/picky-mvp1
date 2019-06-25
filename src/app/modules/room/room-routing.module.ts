import { Routes, RouterModule } from "@angular/router";
import { RoomCreateComponent } from "./components/room-create.component";




const routes: Routes = [
  { path: 'create', component: RoomCreateComponent }
];

export const RoomRouting = RouterModule.forChild(routes);
