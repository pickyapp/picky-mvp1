import { NgModule } from "@angular/core";
import { RoomRouting } from "./room-routing.module";
import { RoomCreateComponent } from "./components/room-create/room-create.component";
import { ClickButtonComponent } from "../ui/click-button/click-button.component";
import { UiModule } from "../ui/ui.module";
import { RoomService } from "./services/room.service";
import { RoomComponent } from "./components/room/room.component";
import { CommonModule } from "@angular/common";
import { RoomPlayComponent } from "./components/room-play/room-play.component";
import { NetworkRoomService } from "./services/network-room.service";



@NgModule({
  declarations: [
    RoomCreateComponent,
    RoomComponent,
    RoomPlayComponent
  ],
  imports: [
    CommonModule,
    RoomRouting,
    UiModule
  ],
  exports: [],
  providers: [
    RoomService,
    NetworkRoomService
  ]
})

export class RoomModule { }
