import { Component, OnInit } from '@angular/core';
import { UsersService } from '../api/users.service';
// import { ImagePickerOptions } from '@ionic-native/image-picker';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  person = {
    img: '',
    name: '',
    tel: '',
    email: '',
    password: '',
    cpassword: '',
    age: '',
    sex: '',
    lifestyle: {},
    educational: '',
    faculty: '',
    year: '',
    facebook: '',
    instagram: '',
    other: ''
  };
  constructor(private usersService: UsersService) { }
  ngOnInit() {
  }
  register() {
    this.usersService.addUser(
      this.person.img,
      this.person.name,
      this.person.tel,
      this.person.email,
      this.person.password,
      this.person.age,
      this.person.sex,
      this.person.lifestyle,
      this.person.educational,
      this.person.faculty,
      this.person.year,
      this.person.facebook,
      this.person.instagram,
      this.person.other
    );
  }

  logData(){
      console.log(this.person);
    }
}

