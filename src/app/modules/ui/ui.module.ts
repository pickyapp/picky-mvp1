import { AnchorComponent } from './anchor/anchor.component';
import { ClickButtonComponent } from './click-button/click-button.component';
import { Header3Component } from './header3/header3.component';
import { NgModule } from "@angular/core";
import { TextfieldComponent } from "./textfield/textfield.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';
import { TimerComponent } from './timer/timer.component';
import { Component } from '@angular/compiler/src/core';
import { OptionButtonComponent } from './option-button/option-button.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { TipComponent } from './tip/tip.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

const uiComponents: any[] = [
  AnchorComponent,
  AnswerComponent,
  ClickButtonComponent,
  Header1Component,
  Header2Component,
  Header3Component,
  OptionButtonComponent,
  ProgressBarComponent,
  QuestionComponent,
  TextfieldComponent,
  TimerComponent,
  TipComponent
]

@NgModule({
  declarations: uiComponents,
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: uiComponents
})

export class UiModule { }

