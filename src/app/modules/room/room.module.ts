import { NgModule } from "@angular/core";
import { RoomRouting } from "./room-routing.module";
import { RoomCreateComponent } from "./components/room-create.component";



@NgModule({
  declarations: [
    RoomCreateComponent
  ],
  imports: [
    RoomRouting
  ],
  exports: []
})

export class RoomModule { }
