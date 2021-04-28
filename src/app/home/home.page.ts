/* tslint:disable */
import { Component, OnDestroy, OnInit, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { empty, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

// import * as firebase from 'firebase';
import '@firebase/auth';
import { AuthenticateService } from '../services/authentication.service';

import { UserProfile } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login.page';
import { stringify } from '@angular/compiler/src/util';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from '../comments/comments.page';

import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from '../api/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UsersService } from '../api/users.service';
import { JoinsService } from '../api/joins.service';
import { NotificationsService } from '../api/notifications.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public posts: PostsService;
  public userProfile: UserProfile;

  post: Subscription;
  user: any = {};
  userEmail: string;
  allPost;
  Post: any = [];
  email_login = ""
  data_user_login = {}
  url = 'http://localhost:3000/user/getuserDetail';
  detail: Object;
  style: any;
  dataDetail: any;
  postData: any;
  userid: string;
  status: boolean;
  buttonColor = "primary";
  onePost: Object;
  joinerId: string;
  dataPost: Object;

  dataJoin: { response: any; };
  allJoin: any;
  joinData: any;
  postDetail: any;
  public statusJoin: boolean;
  public join: boolean;
  public notjoin: boolean;
  public userId;
  thisJoin: any;
  joinChecked: any;
  item = [];
  public isMenuOpen : boolean;
  public ishidden = false;
  total: any;

  constructor(public alertController: AlertController,
    private postsService: PostsService,
    private menu: MenuController,
    public popoverController: PopoverController,
    private postService: PostsService,
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private authService: AuthService,
    private userService: UsersService,
    private joinService: JoinsService,
    public modalController: ModalController,
    private render: Renderer2,
    public notiService: NotificationsService) {

    this.email_login = localStorage.getItem('data_user');
    this.http.get<{ messaeg: string, email: string, status: any }>(this.url + '/' + this.email_login).subscribe((res) => {
      this.data_user_login = res

    })
  }


  async addtojoin(Post_id: string) {
    const alert = await this.alertController.create({
      header: 'สนใจ',
      message: 'คุณสนใจที่จะเข้าร่วมกิจกรรมนี้',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'สนใจ',
          handler: async () => {
            console.log('Send request to Event');


            this.postService.getallPost().subscribe(result => {
              this.allPost = result.response;
              console.log(this.allPost);

            });

            this.postService.getidPost(Post_id).subscribe(data => {
              this.dataPost = data;

              const postId = this.dataPost['_id']
              const postName = this.dataPost['eventname']
              const ownerId = this.dataPost['userid']
              const ownerName = this.dataPost['name']
              const joinerName = this.data_user_login['name']
              this.joinerId = localStorage.getItem('id_user');
              this.status = false;
              const datetime = this.dataPost['datetime']
              const starttime = this.dataPost['starttime']
              const endtime = this.dataPost['endtime']
              const place = this.dataPost['place']
              const type = this.dataPost['type']
              this.joinService.addJoin(postId, postName, ownerName, ownerId, joinerName, this.joinerId, this.status, datetime, starttime, endtime, place, type);
              // this.onePost = data;
              // const name = this.onePost['name'];
              // const eventname = this.onePost['eventname'];
              // const userid = this.onePost['userid'];
              // const description = this.onePost['description'];
              // const type = this.onePost['type'];
              // const datetime = this.onePost['datetime'];
              // const starttime = this.onePost['starttime'];
              // const endtime = this.onePost['endtime'];
              // const place = this.onePost['place'];
              // const location = this.onePost['location'];
              // const amount = this.onePost['amount'];
              // const reqtojoin = this.onePost['reqtojoin'];
              // this.joinerId = localStorage.getItem('id_user');
              // this.status = false;

              // var varPost= {
              //   userid,
              //   name,
              //   eventname,
              //   description,
              //   type,
              //   datetime,
              //   starttime,
              //   endtime,
              //   place,
              //   location,
              //   amount,
              //   reqtojoin
              // }
              // console.log(varPost);

              // console.log("this is a " + userid);
              // this.postService.tojoin(Post_id, name, eventname, userid, description, type, datetime,  
              //  starttime, endtime, place, location, amount, reqtojoin, this.joinerId, this.status,);
            });
            // this.buttonColor = 'danger';
            console.log()
          }
        }
      ]
    });
    await alert.present();
  }


  async leavejoin(Post_id: string) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะยกเลิกการเข้าร่วมอีเว้นท์',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log();
            // this.joinService.leaveJoin(Post_id);
            // this.postService.getidPost(Post_id).subscribe(data => {
            // this.joinerId = localStorage.getItem('id_user');
            // if () { }
            //   this.dataPost = data;
            //   const postId = this.dataPost['_id']
            //   const postName = this.dataPost['eventname']
            //   this.joinerId = localStorage.getItem('id_user');
            //   this.status = false;
            //   this.joinService.addJoin(postId, postName, this.joinerId, this.status);
            // });
          }
        }
      ]
    });
    await alert.present();
  }

  // --------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.userId = user['_id'];
      console.log(this.userId);
    });
    // console.log(this.userId);

    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
    this.notiService.getNotification().subscribe(data => {
      this.total = data.response.length;
      console.log('noti : ',this.total);
      
    })
    // this.userService.getUser().subscribe(result => {
    //   this.detail = result;
    //   console.log(this.detail['lifestyle']);
    //   this.style = this.detail['lifestyle'];
    //   console.log(this.style.toString());
    //   this.postService.getallPost().subscribe(data => {
    //     this.allPost = data.response;
    //     for(let i = 0; i < this.allPost.length; i++) {
    //       // console.log(this.allPost[i]);
    //       this.postData = this.allPost[i];
    //     }
    //   });
    // });

    this.postService.getallPost().subscribe(result => {

      this.allPost = result.response;
      console.log(this.allPost);
      const iduser = localStorage.getItem('id_user');
      this.join = true;
      // this.notjoin = false;

      
      // for (let idd in this.allPost) {
        // this.join = true;
        // this.notjoin = false;
        // this.postData = this.allPost[idd];
        // const idpost = this.postData['_id'];
        // console.log('postname: ', this.postData['eventname']);**************
        // console.log('post id: ',this.postData['_id']);***************
        // console.log('iduser: ',iduser);
        this.statusJoin = false;
        this.join = true;
        // this.notjoin = false;
        // console.log('*');
        this.joinService.getJoin().subscribe(data => {
          this.allJoin = data.response;
          this.thisJoin = this.allJoin.filter(join => join.joinerId == iduser);
          
          // this.ishidden = false;
          for(let i in this.thisJoin){
            // this.joinChecked = this.thisJoin[i];
            this.item.push(this.thisJoin[i]);
          }
          console.log(this.item);
          // for (let j in this.allJoin) {
            // this.statusJoin = Boolean;
            console.log('-------------------------------------------');
          });
          // }
            // ----------------------------------------------------------
            // this.joinData = this.allJoin[j];
            // const post_Id = this.joinData['postId'];
            // const joiner_Id = this.joinData['joinerId'];
            // --------------------------------------------------------------
            // console.log("joinPost :",this.joinData['postId']);
            // console.log("joinUser :",this.joinData['joinerId']);
            
            // if (idpost === post_Id && iduser === joiner_Id) {
              // this.statusJoin = true;
              // console.log('status: ',this.statusJoin);
              
              // console.log('status: อันนี้แหล่ะใช่เลย');  
              // } else {
                // this.statusJoin = false;             
              // console.log('status: ไม่ใช่อันนี้'); 
            // }
            // console.log('*');
          // }
          // console.log(this.statusJoin);**********
          // console.log(this.thisJoin.status);
          
          
          // if (this.statusJoin == true) {
            
            // this.join = false;
            // this.notjoin = true;
            // console.log('โพสนี้ใช่');***********
            
            // } else {
              // this.join = true;
              // this.notjoin = false;
              // console.log('โพสนี้ไม่ใช่');************
              // }
              // console.log(this.join);
              // console.log(this.notjoin);
              
              // const statusJoinNaja = this.statusJoin;
              // console.log(this.thisJoin);
              // for(let j in this.thisJoin){
              //   this.joinChecked = this.thisJoin[j]
                // if(this.thisJoin == null){
                //   console.log('null');
                  
                // }else if (this.thisJoin != null) {
                // console.log(this.joinChecked.joinerId);
                // }
              // }
            // }
            
            
            


      // -------------------------------------------------------------------------------------


    });
  }

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async deletePost(id: string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'คุณต้องการที่จะลบโพส',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log(id);
            this.postService.deletePost(id);
          }
        }
      ]
    });
    await alert.present();
  }
  // ngOnDestroy() {
  //   this.post.unsubscribe();
  // }
  async logOut(): Promise<void> {
    await this.authService.logout();
    localStorage.removeItem('data_user')
    this.router.navigateByUrl('login');
  }

  // -----------------------------test function--------------------------------------------

  async Join(PostId: string) {
    const alert = await this.alertController.create({
      header: 'สนใจเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะเข้าร่วมอีเว้นท์',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('confirm');
              this.join = false;
            this.notjoin = true;
            console.log(this.join);
            console.log(this.notjoin);
            this.isMenuOpen = !this.isMenuOpen;

          }
        }
      ]
    });
    await alert.present();
  }


  async notJoin(Post_id: string) {
    const alert = await this.alertController.create({
      header: 'ยกเลิกเข้าร่วมอีเว้นท์',
      message: 'คุณต้องการที่จะยกเลิกการเข้าร่วมอีเว้นท์',
      buttons: [
        {
          text: 'ยกเลิก',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('confirm');
              this.join = true;
            this.notjoin = false;
            console.log(this.join);
            console.log(this.notjoin);
            this.isMenuOpen = !this.isMenuOpen;

            
            // this.postService.getidPost(Post_id).subscribe(data => {
            //   this.dataPost = data;
            //   const postId = this.dataPost['_id'];
            //   const joinerId = localStorage.getItem('id_user');
            //   this.joinService.leaveJoin(Post_id);

            // });
            // this.joinService.getJoin().subscribe(data => {
            //   this.nowjoin = data;
            //   const idUser = localStorage.getItem('id_user');
            //   const postId = this.nowjoin['postId'];
            //   console.log(postId);
            // });


          }
        }
      ]
    });
    await alert.present();
  }

  async presentModal(name: string, id: string , uid: string) {
    // console.log(id);
    const modal = await this.modalController.create({
      component: CommentsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        eventname: name,
        postId: id,
        userid: uid
      }
    });
    return await modal.present();
  }
  public onShow(controlToShow) {
    // this.ishidden = false;
    // if(this.ishidden == false){
    //   this.ishidden = true;
    this.render.setStyle(controlToShow, 'visibility', 'visible');
    // }else{
    //   this.ishidden = false;
    //       this.render.setStyle(controlToShowandHide, 'visibility', 'hidden');
          
    //     }

    // this.joinChecked = this.render.setStyle(controlToShowandHide, 'visibility', 'hidden');
    // this.joinChecked != this.joinChecked;
  }
  public onHide(controlToHide) {
    this.render.setStyle(controlToHide, 'visibility', 'hidden');
  }


}


