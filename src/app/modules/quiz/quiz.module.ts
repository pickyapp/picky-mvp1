import { NgModule } from "@angular/core";
import { UiModule } from "../ui/ui.module";
import { Routes, RouterModule } from "@angular/router";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizCreateComponent } from "./components/quiz-create/quiz-create.component";
import { QuizTemplateComponent } from "./components/quiz-template/quiz-template.component";
import { QuizDisplayComponent } from "./components/quiz-display/quiz-display.component";
import { CommonModule } from "@angular/common";
import { QuizService } from "./quiz.service";
import { FooterModule } from "../footer/footer.module";

const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'create', component: QuizCreateComponent },
  { path: 'template', component: QuizTemplateComponent },
  { path: ':quizId', component: QuizDisplayComponent }
];


@NgModule({
  declarations: [
    QuizComponent,
    QuizCreateComponent,
    QuizDisplayComponent,
    QuizTemplateComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  providers: [ QuizService ]
})

export class QuizModule {}
