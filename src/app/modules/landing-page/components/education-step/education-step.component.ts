import { Component, OnChanges, Input } from "@angular/core";






@Component({
  selector: "education-step",
  templateUrl: "education-step.component.html",
  styleUrls: [ "education-step.component.scss" ]
})

export class EducationStepComponent implements OnChanges {

  @Input("stepNumber") stepNumber: number;
  @Input("text") text: string;

  ngOnChanges() {}
}

