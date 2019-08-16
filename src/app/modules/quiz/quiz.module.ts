import { NgModule } from "@angular/core";
import { UiModule } from "../ui/ui.module";
import { Routes, RouterModule } from "@angular/router";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizCreateComponent } from "./components/quiz-create/quiz-create.component";
import { QuizTemplateComponent } from "./components/quiz-template/quiz-template.component";
import { QuizDisplayComponent } from "./components/quiz-display/quiz-display.component";
import { CommonModule } from "@angular/common";
import { QuizTemplateCreateService } from "./services/quiz-template-create.service";
import { FooterModule } from "../footer/footer.module";
import { QuizCreateService } from "./services/quiz-create.service";
import { QuizDisplayService } from "./services/quiz-display.service";
import { QuizOwnerComponent } from "./components/quiz-owner/quiz-owner.component";

const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'create', component: QuizCreateComponent },
  { path: 'template', component: QuizTemplateComponent },
  { path: ':quizId', component: QuizDisplayComponent },
  { path: ':quizId/owner', component: QuizOwnerComponent }
];


@NgModule({
  declarations: [
    QuizComponent,
    QuizCreateComponent,
    QuizDisplayComponent,
    QuizOwnerComponent,
    QuizTemplateComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  providers: [
    QuizCreateService,
    QuizDisplayService,
    QuizTemplateCreateService
  ]
})

export class QuizModule {}
