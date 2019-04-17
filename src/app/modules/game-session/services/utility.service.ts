import { Injectable } from "@angular/core";
import { Observable, timer } from "rxjs";
import { switchMap, filter, take } from "rxjs/operators";








@Injectable()
export class UtilityService {
  
  getPoller(intervalTime: number,
    pollFct: (intervalEmit: number) => Observable<any>,
    pollUntil: (resp) => boolean): Observable<any> {
    return timer(0, intervalTime).pipe(
              switchMap(pollFct), // TODO switchMap might cancel requests look at others
              filter(pollUntil),
              take(1)
          );
  }
}

