import { Routes, RouterModule } from '@angular/router';
import { GameSessionComponent } from "./components/game-session/game-session.component";
import { InProgressComponent } from './components/in-progress/in-progress.component';

const routes: Routes = [
  { path: ':gameSessionName', component: GameSessionComponent },
  { path: ':gameSessionName/in-progress', component: InProgressComponent }
];

export const gameSessionRouting = RouterModule.forChild(routes);
