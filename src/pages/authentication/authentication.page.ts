import {Component} from '@angular/core';
import {AuthService} from '../../providers/auth.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, ToastController, LoadingController} from 'ionic-angular';
import {SmsVerifyPage} from '../pages';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {
  mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private complexForm: FormGroup;
  lockNextButton: boolean;
  phonePlaceholder: string = '+7(___) ___-____';
  phone: string;

  constructor(private fb: FormBuilder,
              public navCtrl: NavController,
              public auth: AuthService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

    this.lockNextButton = true;
    this.complexForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'phone': ['', this.customValidator]
    });
  }

  /**
   * check phone length
   * @param control - {FormControl}
   * @return {{invalidPhone: boolean}}
   */
  customValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value)
      return {invalidPhone: true};
    else {
      if (control.value.replace(/\D+|\s/g, '').length < 11) { // text-mask input plugin bugfix
        return {invalidPhone: true};
      }
    }
  }

  submitForm(form: FormGroup) {

    if (form.valid) {
      this.lockNextButton = true;

      // let phone = form.value.phone.replace(/\D+/g, '');
      let name = form.value.name;
      let phone = this.phone;

      console.log(phone);

      this.login(name, phone);

    } else {
      this.showToast('Проверьте данные');
    }
  }

  /**
   * login
   */
  login(name: string, phone: string): void {
    let loading = this.loadingCtrl.create({
      content: "Отправка сообщения..."
    });
    loading.present();

    this.auth.login(name, phone)
      .subscribe((data) => {

        loading.dismissAll();
        this.lockNextButton = false;
        this.navCtrl.push(SmsVerifyPage, {name: name, phone: phone, code: data});

      }, (err) => {
        loading.dismissAll();
        this.showToast("Что-то пошло не так, обратитесть к администратору. Ошибка: " + err);
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

  setPlaceholder(input: HTMLInputElement) {
    input.placeholder = this.phonePlaceholder;
  }

  setNamePlaceholer(input: HTMLInputElement) {
    input.placeholder = "";
  }

  updatePhone(inputValue : string) : void {
    this.phone = inputValue.replace(/\D+/g, '');
  }

  /**
   * Plugin pipe function
   * @param conformedValue
   * @param config
   * @return {any}
   */
  inputMaskPipe(conformedValue, config) {
    return conformedValue;
  }
}
