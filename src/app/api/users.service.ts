import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Subject } from 'rxjs';
// import { threadId } from 'worker_threads';
import { LoginPage } from '../login/login.page';
import { AuthData } from './../models/auth-data.model';





// const httpOptionsPlain = {
//   headers: new HttpHeaders({
//     Accept: 'text/plain',
//     'Content-Type': 'text/plain'
//   }),
//   responseType: 'text'
// };
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  logData: {};
  userEmail: string;

  userid: string;
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

  constructor(public http: HttpClient,
              public router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string){
    const authData: AuthData = { email, password };
    this.http.post<{ token: string; expiresIn: number; userId: string }>(
      // 'http://localhost:8080/users/authentication',
      'http://localhost:3000/user/authentication',
      authData
    )      .subscribe(
      (response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/home']);

        }
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );

  }


  getallUser() {
    return this.http.get('http://localhost:3000/user/getuser');
  }
  getuserDetail() {
    // return this.http.post('http://localhost:3000/user/getuserDetail', email, password);
  }
  getidUser(id: string) {
    return this.http.get('http://localhost:3000/user/getidUser/' + id);
  }
  getUser() {
    this.userid = localStorage.getItem('id_user');
    this.userEmail = localStorage.getItem('data_user');
    console.log(localStorage.getItem('id_user'));
    return this.http.get('http://localhost:3000/user/getuserDetail/' + this.userEmail);
  }
  addUser(
    email: string,
    password: string,
    name: string,
    tel: string,
    age: string,
    sex: string,
    lifestyle: {},
    educational: string,
    faculty: string,
    year: string,
    facebook: string,
    instagram: string,
    other: string,
    img: string,

  ) {
    this.logData = {
      email,
      password,
      name,
      tel,
      age,
      sex,
      lifestyle,
      educational,
      faculty,
      year,
      facebook,
      instagram,
      other,
      img
    };
    console.log(this.logData);
    this.http.post('http://localhost:3000/user/adduser', this.logData).subscribe((res) => {
      console.log(res);
    });


  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log('autoAtuthUser : ', authInformation);
    if (!authInformation) {
      console.log(`Don't have authInformation infunction : getAuthData`);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(`AuthoAutUser working now : ${now} , ${expiresIn}`);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    } else {
      this.logout();
      this.router.navigate(['/']);
      // Swal.fire(
      //   "Session Expired;",
      //   "เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้งครับ",
      //   "info"
      // );
    }
  }
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
      console.log('Now status you logout !');
    }, duration * 10000);
    // }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    console.log('Save alredy daya of user : saveAuthData !');
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    console.log('Clear Authentication data : clearAuthData');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    console.log(
      `Token : ${token}, expireationDate : ${expirationDate}, userId : ${userId} `
    );
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    //  Swal.fire(
    //     'Session Expired;',
    //     'เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบอีกครั้งครับ',
    //     'info'
    //   );
  }

}
