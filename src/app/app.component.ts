import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyAppRecipeBook {
  // available root pages
  tabsPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;

  // gets a reference to the ion-nav component, using the local reference 'nav'
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController) {

      firebase.initializeApp({
        apiKey: "AIzaSyCdJuMaq4pQhcAdSBAAgZboY5ASeDDO6Ic",
        authDomain: "ionic-ciro-recipe-book.firebaseapp.com",
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Set the input page as root
   * @param page the page to be set as root
   */
  onLoad(page: any){
    this.nav.setRoot(page);
    // close the menu
    this.menuCtrl.close();
  }

  onLogout(){
    // TODO
  }
}

