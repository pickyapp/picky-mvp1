import { Directive, HostListener, EventEmitter, Output } from "@angular/core";


@Directive({ selector: "[clickListener]" })
export class ClickListenerDirective {

  @Output() atclick: EventEmitter<string>;

  constructor() {
    this.atclick = new EventEmitter<string>();
  }

  @HostListener('click') onClick() {
    this.atclick.emit("clicked");
  }
}
