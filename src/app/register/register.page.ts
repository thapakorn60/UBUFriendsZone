import { Router } from '@angular/router';
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
    email: '',
    password: '',
    // cpassword: '',
    name: '',
    tel: '',
    age: '',
    sex: '',
    lifestyle: {},
    educational: '',
    faculty: '',
    year: '',
    facebook: '',
    instagram: '',
    other: '',
    img: ''
  };
  constructor(public usersService: UsersService,
              public router: Router) { }
  ngOnInit() {

    
  }
  register() {
    this.usersService.addUser(
      this.person.email,
      this.person.password,
      this.person.name,
      this.person.tel,
      this.person.age,
      this.person.sex,
      this.person.lifestyle,
      this.person.educational,
      this.person.faculty,
      this.person.year,
      this.person.facebook,
      this.person.instagram,
      this.person.other,
      this.person.img,
      );
      console.log(this.person);
      this.router.navigateByUrl('login');
    }

  logData(){
    }
}

