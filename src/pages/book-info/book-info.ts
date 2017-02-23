import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BookInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  book : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.book= this.navParams.get('book');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookInfoPage');
  }

}
