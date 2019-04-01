import { NgModule } from "@angular/core";
import { GameSessionComponent } from "./components/game-session/game-session.component";
import { InProgressComponent } from "./components/in-progress/in-progress.component";
import { gameSessionRouting } from "./game-session-routing.module";
import { UiModule } from "../ui/ui.module";
import { CommonModule } from "@angular/common";
import { UserService } from "./services/user.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    GameSessionComponent,
    InProgressComponent
  ],
  imports: [
    CommonModule,
    gameSessionRouting,
    HttpClientModule,
    UiModule
  ],
  providers: [ UserService ]
})

export class GameSessionModule { }

