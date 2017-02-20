import { Component, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-authentication',
    templateUrl: 'authentication.html'
})
export class Authentication {
    name: string;
    phone: string;

    constructor(public navCtrl: NavController, el: ElementRef) {
        console.log(el);
    }

    setMask(phone) : void {

    }

    showMask() : void {

    }
}