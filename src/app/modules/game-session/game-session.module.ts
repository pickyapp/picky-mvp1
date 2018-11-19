import { NgModule } from "@angular/core";
import { GameSessionComponent } from "./components/game-session/game-session.component";
import { gameSessionRouting } from "./game-session-routing.module";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/user/user.reducer";
import { UiModule } from "../ui/ui.module";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { GameSessionEffects } from "./store/game-session/game-session.effects";
import { GameSessionService } from "./game-session.service";

@NgModule({
  declarations: [
    GameSessionComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GameSessionEffects]),
    gameSessionRouting,
    StoreModule.forFeature('gameSession', {
      user: userReducer
    }),
    UiModule,
  ],
  providers: [ GameSessionService ]
})

export class GameSessionModule { }

