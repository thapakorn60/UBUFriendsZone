import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import { threadId } from 'worker_threads';
import { LoginPage } from '../login/login.page';


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
  userId: string;
  userid: string;

  constructor(private http: HttpClient,
              private iab: InAppBrowser) { }
  getallUser(){
    return this.http.get('http://localhost:3000/user/getuser');
  }
    getuserDetail(){
      // return this.http.post('http://localhost:3000/user/getuserDetail', email, password);
  }
  getUser(){
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
    // img: string,

  ){
    this.logData = {
      email,
      // password,
      // img,
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
      other
    };
    console.log(this.logData);
    this.http.post('http://localhost:3000/user/adduser', this.logData).subscribe((res) => {
      console.log(res);
    });


  }
  LogInGoogle(){
  }
}
