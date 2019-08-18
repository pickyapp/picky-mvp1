import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { take, switchMap, tap } from "rxjs/operators";
import { QuizOwnerService } from "src/app/modules/quiz/services/quiz-owner.service";
import { sha256 } from "js-sha256";
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'quiz-owner',
  templateUrl: 'quiz-owner.component.html',
  styleUrls: [ 'quiz-owner.component.scss' ]
})

export class QuizOwnerComponent {

  readonly LOGIN_VIEW: string = "login_view";
  readonly RESULTS_VIEW: string = "results_view";
  viewType: string;
  
  password: string;
  cookie: any;
  loginBtnText: string;

  responses: any[];

  constructor(
    private route: ActivatedRoute,
    public qoService: QuizOwnerService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.password = "";
    this.viewType = this.LOGIN_VIEW;
    this.cookie = {};
    this.loginBtnText = "Login";
    let subs = this.route.params.pipe(
      take(1),
      switchMap(params => this.qoService.getQuiz(params["quizId"])),
      take(1)
    ).subscribe(resp => {
      this.qoService.setQuiz(resp);
      this.cookie = this.getCookie().quiz;
      if (this.cookie) {
        this.getResults();
        this.viewType = this.RESULTS_VIEW;
      }
      subs.unsubscribe();
    });
  }

  onLogin() {
    const passHash = sha256(this.password);
    this.password = "";
    const s = this.qoService.login(passHash).subscribe(resp => {
      this.cookie = this.getCookie().quiz;
      if (this.cookie) {
        this.getResults();
        this.viewType = this.RESULTS_VIEW;
      } else {
        this.loginBtnText = "Try Again";
      }
      s.unsubscribe();
    });
  }

  getResults() {
    const s = this.qoService.getAggregateResults().subscribe(resp => {
      this.qoService.setResults(resp.results);
      s.unsubscribe();
    });
  }

  onLogout() {
    const s = this.qoService.logout().subscribe(resp => {
      this.viewType = this.LOGIN_VIEW;
      this.qoService.resetResultValues();
    })
  }

  getCookie() {
    return JSON.parse(atob(this.cookieService.get('user')));
  }
}