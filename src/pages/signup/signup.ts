import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

/**
 * Manages the form (mail and password)
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.signup(form.value.mail, form.value.password)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

}
