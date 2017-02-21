import {Component} from '@angular/core';
import {AuthService} from './authentication.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, ToastController} from 'ionic-angular';
import {SmsVerifyPage} from '../pages';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {
  mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private complexForm: FormGroup;
  lockNextButton: boolean;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public auth: AuthService,
              public toastCtrl: ToastController) {

    this.lockNextButton = false;
    this.complexForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'phone': ['', Validators.compose([Validators.required, this.customValidator])]
    });
  }

  /**
   * check phone length
   * @param control - {FormControl}
   * @return {{invalidPhone: boolean}}
   */
  customValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value)
      if (control.value.replace(/\D+|\s/g, '').length !== 10) {
        return {invalidPhone: true};
      }
  }

  submitForm(form: FormGroup) {

    let phone = form.value.phone.replace(/\D+/g, '');
    let name = form.value.name;
    this.navCtrl.push(SmsVerifyPage, {name: name, phone: phone});

    // if (form.valid) {
    //   this.lockNextButton= true;
    //
    //   let phone = form.value.phone.replace(/\D+/g, '');
    //   let name = form.value.name;
    //
    //   this.login(name, phone);
    //
    // } else {
    //   this.showToast('Проверьте данные');
    // }
  }

  /**
   * login
   */
  login(name: string, phone: string) {
    this.auth.login(name, phone)
      .subscribe((data) => {
        console.log(data);
      }, (err) => {
        this.showToast("Что-то пошло не так, обратитесть к администратору");
        this.lockNextButton = false;
      });
  }

  /**
   * Toast message
   * @param text
   */
  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      closeButtonText: "OK"
    });

    toast.present();
  }
}
