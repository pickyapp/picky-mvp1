import { NgModule } from "@angular/core";
import { GameSessionComponent } from "./components/game-session/game-session.component";
import { InProgressComponent } from "./components/in-progress/in-progress.component";
import { gameSessionRouting } from "./game-session-routing.module";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";
import { UiModule } from "../ui/ui.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    GameSessionComponent,
    InProgressComponent
  ],
  imports: [
    CommonModule,
    gameSessionRouting,
    StoreModule.forFeature('gameSessionData', {
      user: userReducer
    }),
    UiModule,
  ]
})

export class GameSessionModule { }

