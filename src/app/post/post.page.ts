/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { PostsService } from '../api/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../api/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { NavParams } from '@ionic/angular';
// NavParams

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public userProfile: UserProfile;
  email_login = "";
  data_user_login = {};
  url = 'http://localhost:3000/user/getuserDetail';
  today = Date.now();
  Post = {
    name: '',
    eventname: '',
    userid: '',
    description: '',
    type: '',
    datetime: '',
    starttime: '',
    endtime: '',
    place: '',
    location: '',
    amount: 0,
    // reqtojoin:[]
  };
  dateNow = Date.now();



  map: any;
  lat: number;
  long: number;
  userId: any;
  mode: string = 'create';
  // name: any;
  selectedcollegename: any;
  userid: any;
  postId: string;
  iduser: any;
  dataUser: Object;
  userName: any;


  constructor(private geolocation: Geolocation,
    private postsService: PostsService,
    private profileService: ProfileService,
    private http: HttpClient,
    private userServices: UsersService,
    private route: ActivatedRoute,
    public router: Router,
    public toastController: ToastController
  ) {
    this.email_login = localStorage.getItem('data_user');

    this.http.get<{ messaeg: string, email: string, status: any }>(this.url + '/' + this.email_login).subscribe((res) => {
      this.data_user_login = res;
    });
    // this.name = navParams.get('name');
    // this.selectedcollegename = this.name;

  }


  // post() {
  //   console.log(this.Post);
  // }
  showlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp);
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      console.log(this.lat, ' ', this.long);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // const watch = this.geolocation.watchPosition();
  // watch.subscribe((data) => {
  //   // data can be a set of coordinates, or an error (if an error occurred).
  //   // data.coords.latitude
  //   // data.coords.longitude
  //   console.log(data);
  //   // console.log(data., data.coords.longitude)
  // });

  ngOnInit() {
    // this.profileService.getUserProfile().then(profile$ => {
    //   profile$.subscribe(userProfile => {
    //     this.userProfile = userProfile;
    //   });
    // });
    this.iduser = localStorage.getItem('id_user');
    this.userServices.getidUser(this.iduser).subscribe(result => {
      this.dataUser = result;
      this.userName = this.dataUser['name'];
      console.log(this.userName);
    });
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap.has('id'));
      if (paramMap.has('id')) {
        this.mode = 'edit';
        console.log(this.mode);
        this.postId = paramMap.get('id');
        // console.log(id);
        this.postsService.getidPost(this.postId).subscribe(data => {
          console.log(data);
          this.Post = {
            name: data['name'],
            eventname: data['eventname'],
            userid: data['userid'],
            description: data['description'],
            type: data['type'],
            datetime: data['datetime'],
            starttime: data['starttime'],
            endtime: data['endtime'],
            place: data['place'],
            location: data['location'],
            amount: data['amount'],
          }
        });

      } else {
        this.mode = 'create';
      }
    });
    // this.selectedcollegename = this.name;
  }

async  addpost() {
    if (this.mode == 'edit') {
      this.postsService.editPost(
        this.postId,
        this.Post.name,
        this.Post.eventname,
        this.Post.userid,
        this.Post.description,
        this.Post.type,
        this.Post.datetime,
        this.Post.starttime,
        this.Post.endtime,
        this.Post.place,
        this.Post.location,
        this.Post.amount
      );
    } else {
      if (this.Post.eventname == '' || this.Post.type == '' || this.Post.datetime == '' || this.Post.starttime == ''
          || this.Post.endtime == '' || this.Post.amount == 0) {
            const toast = await this.toastController.create({
              message: 'กรอกข้อมูลไม่ครบ',
              duration: 2000
            });
            toast.present();
      // } else if (this.Post.datetime < this.dateNow) {
      //   const toast = await this.toastController.create({
      //     message: 'Not message.',
      //     duration: 2000
      //   });
      //   toast.present();

      }else{
        this.userid = localStorage.getItem('id_user');
        this.postsService.addPost(
          this.userName,
          this.Post.eventname,
          this.userid,
          this.Post.description,
          this.Post.type,
          this.Post.datetime,
          this.Post.starttime,
          this.Post.endtime,
          this.Post.place,
          this.Post.location,
          this.Post.amount
        );
      this.router.navigate(['/home']);

      // });
        }
    }
  }
}

