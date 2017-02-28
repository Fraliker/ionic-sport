import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {AuthenticationPage, DashboardPage} from "../pages/pages";
import {AuthService} from './services/auth.service';
import {User} from "./models/user.model";
import {MainSportChoosePage} from "../pages/main-sport-choose/main-sport-choose";
import {TimeSelectPage} from "../pages/time-select/time-select";

@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;// = AuthenticationPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public auth: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      return this.auth.isAuthentificated();
    }).then((user: User) => {
      if (user.token != null) {
        this.rootPage = TimeSelectPage;
      } else {
        this.rootPage = AuthenticationPage;
      }
    }).catch((err) => {
      console.log(err);
      this.rootPage = AuthenticationPage;
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
