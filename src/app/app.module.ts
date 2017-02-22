import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
/**
 * library
 */
import { TextMaskModule } from 'angular2-text-mask';
/**
 * pages import
 */
import {SmsVerifyPage, AuthenticationPage, DashboardPage, BookInfoPage} from './pages/pages';
/**
 * import services
 */
import {AuthService} from '../app/services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    SmsVerifyPage,
    DashboardPage,
    BookInfoPage
  ],
  imports: [
    FormsModule,
    IonicModule.forRoot(MyApp),
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticationPage,
    SmsVerifyPage,
    DashboardPage,
    BookInfoPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
