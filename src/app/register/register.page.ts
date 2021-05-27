import { ActivatedRoute, Router } from '@angular/router';
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
  personEdit = {
    email: '',
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
  mode: string;
  userId: string;
  image: string | ArrayBuffer;
  constructor(public usersService: UsersService,
              public router: Router,
              private route: ActivatedRoute,) { }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap.has('id'));
      if (paramMap.has('id')) {
        this.mode = 'edit';
        console.log(this.mode);
        this.userId = paramMap.get('id');
        // console.log(id);
        this.usersService.getidUser(this.userId).subscribe(data => {
          console.log(data);
          this.person = {
            email: data['email'],
            password: data['password'],
            name: data['name'],
            tel: data['tel'],
            age: data['age'],
            sex: data['sex'],
            lifestyle: data['lifestyle'],
            educational: data['educational'],
            faculty: data['faculty'],
            year: data['year'],
            facebook: data['facebook'],
            instagram: data['instagram'],
            other: data['other'],
            img: data['img']
          }
        });

      } else {
        this.mode = 'create';
      }
    });
  }
  register() {
    if (this.mode == 'edit') {
      this.usersService.editUser(
        this.userId,
        this.person.email,
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
    }else {
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
    // console.log(this.person);
    this.router.navigateByUrl('login');
    }
  }
  onSelectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.person.patchValue({ img: file });
    // this.person.img.get("img").updateValueAndValidity();
    console.log(file);
    // console.log(this.person);
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  logData(){
    }
}

