import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private facebookIcon = '../../../assets/facebook.svg';
  private instagramIcon = '../../../assets/instagram.png';
  private googleIcon = '../../../assets/google.svg';
  private twitterIcon = '../../../assets/twitter.png';

  constructor() { }

  ngOnInit() {
  }

}
