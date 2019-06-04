import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: "in-progress",
  templateUrl: "in-progress.component.html",
  styleUrls: [ "in-progress.component.scss" ]
})

export class InProgressComponent implements OnInit {


  ngOnInit() {
    this.spinner.show("in-progress-spinner", {
      fullScreen: true,
      type: 'square-jelly-box'
    });
  }
  constructor(
    private spinner: NgxSpinnerService
  ) {}

  ngOnDestroy () {
    this.spinner.hide("in-progress-spinner");
  }
}
