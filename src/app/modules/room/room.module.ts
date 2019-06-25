import { NgModule } from "@angular/core";
import { RoomRouting } from "./room-routing.module";
import { RoomCreateComponent } from "./components/room-create.component";
import { ClickButtonComponent } from "../ui/click-button/click-button.component";
import { UiModule } from "../ui/ui.module";
import { RoomService } from "./services/room.service";



@NgModule({
  declarations: [
    RoomCreateComponent
  ],
  imports: [
    RoomRouting,
    UiModule
  ],
  exports: [],
  providers: [
    RoomService
  ]
})

export class RoomModule { }
