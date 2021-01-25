import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  logData: {};


  constructor(private http: HttpClient) { }
  // getUser(){
  //   return this.http.get('http://localhost:3000/user/getuser');
  // }
  addUser(
    img: string,
    name: string,
    tel: string,
    email: string,
    password: string,
    age: string,
    sex: string,
    lifestyle: {},
    educational: string,
    faculty: string,
    year: string,
    facebook: string,
    instagram: string,
    other: string

  ){
    this.logData = {
      img,
      name,
      tel,
      email,
      password,
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

    // console.log(this.logData);
    // this.http.post('http://localhost:3000/user/adduser', this.logData).subscribe((res) => {
    //   console.log(res);
    // });


    // const data = {
    //   // img: img,
    //   // name: name,
    //   // tel: tel,
    //   // email: email,
    //   // password: password,
    //   // cpassword: cpassword,
    //   // age: age,
    //   // sex: sex,
    //   // lifestyle: lifestyle,
    //   // educational: educational,
    //   // faculty: faculty,
    //   // year: year,
    //   // facebook: facebook,
    //   // instagram: instagram,
    //   // other: other
    // }

  }
}
