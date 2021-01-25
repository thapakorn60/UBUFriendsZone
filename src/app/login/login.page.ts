import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logIn = {
    email: '',
    password: ''
  };
  constructor() { }
  login(){
    console.log(this.logIn);
  }
  ngOnInit() {
  }

}
