import { Component, Input } from "@angular/core";



@Component({
  selector: "header3",
  templateUrl: "./header3.component.html",
  styleUrls: [ "./header3.component.scss" ]
})

export class Header3Component {

  @Input("headerText") private  headerText: string;

  constructor( ) {}
}
