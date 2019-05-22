import { Component, Input } from "@angular/core";



@Component({
  selector: "header1",
  templateUrl: "./header1.component.html",
  styleUrls: [ "./header1.component.scss" ]
})

export class Header1Component {

  @Input("headerText") headerText: string;

  constructor( ) {}
}
