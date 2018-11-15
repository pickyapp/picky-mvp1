import { Routes, RouterModule } from '@angular/router';
import { GameSessionComponent } from "./components/game-session.component";

const routes: Routes = [
  { path: ':gameSessionName', component: GameSessionComponent }
];

export const gameSessionRouting = RouterModule.forChild(routes);
