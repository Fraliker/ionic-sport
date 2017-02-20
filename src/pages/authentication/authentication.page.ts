import {Component} from '@angular/core';
import {AuthService} from './authentication.service';
import {FormControl, FormGroup, Validators, NgForm, FormBuilder} from '@angular/forms';
import {NavController, ToastController} from 'ionic-angular';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private complexForm: FormGroup;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public auth: AuthService,
              public toastCtrl: ToastController) {

    this.complexForm = fb.group({
      'name': ['', Validators.minLength(2)],
      'phone': ['', Validators.required],
    });
  }

  submitForm(form: FormGroup) {

    if (form.valid) {

      let phone= form.value.phone.replace(/\D+/g, '');
      let name = form.value.name;
      console.log(phone, name);

      this.login(name, phone);

    } else {
      this.showToast('Проверьте данные');
    }
  }

  /**
   * login
   */
  login(name: string, phone: string) {
    this.auth.login(name, phone)
      .subscribe((data) => {
        console.log(data);
      }, (err) => {
        this.showToast("Что-то пошло не так");
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
