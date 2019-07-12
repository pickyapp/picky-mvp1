import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
  selector: 'tip',
  templateUrl: "tip.component.html",
  styleUrls: [ 'tip.component.scss' ]
})

export class TipComponent {
  @Input('tipHelpText') tipHelpText: string;
  @Input('btnText') btnText: string;
  @Output('onTipAction') onTipAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

  }

  tipActionClick() {
    this.onTipAction.emit(true);
  }

}