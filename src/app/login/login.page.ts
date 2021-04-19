/* tslint:disable */
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserCredential } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import firebase from 'firebase/app';

import '@firebase/auth';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UsersService } from '../api/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { constants } from 'buffer';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(AuthFormComponent) loginForm: AuthFormComponent;
  url = 'http://localhost:3000/user/getuserDetail';
  submitError: string;
  signInForm: FormGroup;
  authRedirectResult: Subscription;
  userId: string;
  userEmail: string;

  constructor(    private router: Router,
                  private ngZone: NgZone,
                  public loadingController: LoadingController,
                  public navCtrl: NavController,
                  private userService: UsersService,
                  private authService: AuthService,
                  private http: HttpClient
                  ){     }
  ngOnInit(){}

  async loginUser(credentials: UserCredential): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.authService.login(
        credentials.email,
        credentials.password
        );
      this.authService.userId = userCredential.user.uid;
      this.http.get<{messaeg: string, email: string, status: any}>(this.url + '/' + credentials.email).subscribe((res)=>{
        localStorage.setItem('data_user', res.email);
        // console.log(res);
        localStorage.setItem('id_user', res['_id']);
        // this.getUser();
      })
      await this.loginForm.hideLoading();
      // this.userService.getuserDetail();
      this.router.navigateByUrl('home');

    } catch (error) {
      await this.loginForm.hideLoading();
      this.loginForm.handleError(error);
    }
  }
  // getUser(){
  //   this.userId = localStorage.getItem('id_user');
  //   this.userEmail = localStorage.getItem('data_user');
  //   console.log(localStorage.getItem('id_user'));
  //   this.http.get('http://localhost:3000/user/getuserDetail/'+this.userEmail
  //   )
  // }


}
