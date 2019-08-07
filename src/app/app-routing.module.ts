import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './modules/about-us/about-us.component';

const routes: Routes = [
  { path: '', loadChildren: './modules/landing-page/landing-page.module#LandingPageModule' },
  { path: 'live', loadChildren: './modules/live-landing-page/live-landing-page.module#LiveLandingPageModule' },
  { path: 'room', loadChildren: './modules/room/room.module#RoomModule' },
  { path: 'quiz', loadChildren: './modules/quiz/quiz.module#QuizModule' },
  { path: 'about', component: AboutUsComponent }
];

export const RootRouting = RouterModule.forRoot(routes);
